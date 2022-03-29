import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs';
import { GitHubFollowersService } from '../services/github-followers.service';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  public user = 'JRSmiffy';
  public followers: any;

  constructor(private service: GitHubFollowersService) { }

  ngOnInit(): void {
    this.getFollowers(this.user);
  }

  getFollowers(user: string) {
    this.service.getAll()
    .subscribe({
      next: (response) => {
        this.followers = response;
        console.log(this.followers);
      }
    });
  }

}
