import { Component, OnInit } from '@angular/core';
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
      .subscribe({
        next: (response) => {
          this.posts = response;
        }, 
        error: (error) => {
          alert('An unexpected error occurred.'); // simulated toast notification
          console.log(error); } // simulated log to database
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = ''; // clear field

    this.service.createPost(post)
      .subscribe({
        next: (response) => {
          post.id = (response as any).id;
          this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
          console.log(this.posts);
        }, 
        error: (error) => {
          alert('An unexpected error occurred.'); // simulated toast notification
          console.log(error); // simulated log to database
        }
      });
  }

  updatePost(post: any){
    post.isRead = true;
    this.service.updatePost(post)
      .subscribe({
        next: (response) => {
          console.log(response);
        }, 
        error: (error) => {
          alert('An unexpected error occurred.'); // simulated toast notification
          console.log(error); // simulated log to database
        }
      });
  }

  deletePost(post: any) {
    this.service.deletePost(post.id)
      .subscribe({
        next: (response) => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        error: (error) => {
          alert('An unexpected error occurred.'); // simulated toast notification
          console.log(error); // simulated log to database
        }
      });
  }

}
