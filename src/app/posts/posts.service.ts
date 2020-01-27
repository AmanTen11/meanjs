import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService{

  constructor(private http : HttpClient){}

  //In this service, we are creating the add Post method which is an alternative to event binding method

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  // getPosts(){
  //   return [...this.posts];
  // }

  // ---------before adding MongoDb -- _id is not mapped----------
  // getPosts(){
  //   this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
  //   .subscribe((postData) =>{
  //     // posts coming from server
  //       this.posts = postData.posts;
  //       this.postsUpdated.next([...this.posts]);
  //   });
  // }

  // ---------after adding MongoDb -- _id is mapped---------------
  getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
        return postData.posts.map(post => {
            return {
              title : post.title,
              content : post.content,
              id : post._id
            }
        });
    }))
    .subscribe((transformedPosts) =>{
      // posts coming from server
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  // Listener to addPost event
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  // objects are reference types in JS ----- Properties of Objects can be accessed
  addPost(title : string , content : string){
      const post : Post = {id: null, title : title , content : content}
      this.http.post<{message : string, postId : string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData)=>{
              //console.log(responseData.message);
              post.id = responseData.postId ;
              this.posts.push(post);
              this.postsUpdated.next([...this.posts])
        });

  }

  deletePost(postId : string){
    this.http.delete('http://localhost:3000/api/posts/'+ postId)
    .subscribe(()=>{
      //console.log("Deleted");
      const updatedPosts = this.posts.filter(post => post.id != postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
