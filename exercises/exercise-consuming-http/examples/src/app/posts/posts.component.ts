import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  posts: any;
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { 
    // by adding the 'private' modifier, it becomes a parameter property 
      // hence we can access this 'http' variable outside of the constructor
    http.get(this.url)
      .subscribe(response => {
        console.log(response);
        this.posts = response;
      });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = ''; // clear field

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post.id = (response as any).id;
        this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
        console.log(this.posts);
      });
  }

  updatePost(post: any){ // could use a DTO for strong typing
    let url = this.url + '/' + post.id;

    // PUT
    this.http.put(url, JSON.stringify(post));

    // PATCH
    this.http.patch(url, JSON.stringify({ isRead: true }))
      .subscribe(response => {
        console.log(response);
      });
  }

  deletePost(post: any) {
    let url = this.url + '/' + post.id;
    this.http.delete(url)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      })
  }

}
