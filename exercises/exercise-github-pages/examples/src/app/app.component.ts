import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'jrsmiffy';
  imgUrl = '';
  githubUrl = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://api.github.com/users/jrsmiffy').subscribe(
      (repsonse: any) => {
        console.log(repsonse);
        this.imgUrl = repsonse.avatar_url;
        this.githubUrl = repsonse.html_url;
    });
  }

}