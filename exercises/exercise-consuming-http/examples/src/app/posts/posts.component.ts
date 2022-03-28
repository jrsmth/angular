import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NotFoundError } from '../common/errors/not-found-error';
import { BadInputError } from './../common/errors/bad-input-error';
import { AppError } from './../common/errors/app-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe({
        next: (response) => {
          this.posts = response;
        }
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = ''; // clear field

    this.service.create(post)
      .subscribe({
        next: (response) => {
          post.id = (response as any).id;
          this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
          console.log(this.posts);
        }, 
        error: (error: AppError) => {
          if (error instanceof BadInputError)
            alert('An error occured with the input data');
            // this.form.setErrors(error.originalError);
              // if this was tied to a form, we could set err programmatically
          else throw error; // propagate the error to the global error handler
        }
      });
  }

  updatePost(post: any){
    post.isRead = true;
    this.service.update(post)
      .subscribe({
        next: (response) => {
          console.log(response);
        }
      });
  }

  deletePost(post: any) {
    this.service.delete(345) // post.id // simulates 404 err
      .subscribe({
        next: (response) => {
          console.log(response);
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        error: (error: AppError) => {
          if (error instanceof NotFoundError) 
            alert('This post has already been deleted'); // simulated toast notification
          else throw error; // propagate the error to the global error handler
        }
      });
  }

}
