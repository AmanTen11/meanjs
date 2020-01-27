import { Component, EventEmitter, Output } from '@angular/core';
// import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector : 'app-post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{

  constructor(public postService : PostsService){}

  //enteredTitle = "";
  //enteredContent = "";

  //@Output() createdPost = new EventEmitter<Post>();

  // with Two way binding
  // onSavePost(){
  //   const post : Post = {title : this.enteredTitle , content : this.enteredContent};
  //   this.createdPost.emit(post);
  // }


  // With Form driven approach
  // onSavePost(formf : NgForm){
  //   if(formf.valid){
  //     const post : Post = {title : formf.value.title , content : formf.value.content};
  //     this.createdPost.emit(post);
  //     }
  //   }

  onSavePost(formf : NgForm){
    if(formf.invalid){
      return;
    }
    this.postService.addPost(formf.value.title, formf.value.content);
    formf.resetForm();
  }

}
