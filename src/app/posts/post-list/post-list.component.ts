import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit{

  // posts = [
  //   {title : 'First Title', content : 'First title content'},
  //   {title : 'Second Title', content : 'Second title content'},
  //   {title : 'Third Title', content : 'Third title content'},
  // ]

  //@Input() posts : Post[] = [];

  posts : Post[] = [];

  constructor(public postsService : PostsService){}

  // ngOnInit(){
  //   this.posts = this.postsService.getPosts();
  //   this.postsService.getPostUpdateListener()
  //     .subscribe((posts: Post[])=>{
  //         this.posts = posts;
  //     });
  // }

  ngOnInit(){
    this.postsService.getPosts();
    this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[])=>{
          this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
}
