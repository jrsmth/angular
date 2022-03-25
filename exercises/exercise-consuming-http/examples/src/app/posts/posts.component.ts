import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getPosts()
      .subscribe(response => {
        console.log(response);
        this.posts = response;
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = ''; // clear field

    this.service.createPost(post)
      .subscribe(response => {
        post.id = (response as any).id;
        this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
        console.log(this.posts);
      });
  }

  updatePost(post: any){
    post.isRead = true;
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(post: any) {
    this.service.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }

}
