import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { GitHubFollowersService } from '../services/github-followers.service';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {

  public user = 'JRSmiffy';
  public followers: any;

  constructor(
    private route: ActivatedRoute, 
    private service: GitHubFollowersService) { }

  ngOnInit(): void {
    // combineLatest(
    //     this.route.paramMap, // index 0
    //     this.route.queryParamMap) // index 1
    //   .subscribe( combined => {
    //     let id = combined[0].get('id');
    //     let order = combined[1]['get']('order');
    //     console.log(id);
    //     console.log(order);
    //   });

    this.getFollowers(this.user);

    this.route.queryParamMap
      .subscribe(params => {
        let page = params['get']('page');
        console.log(page);
        let order = params['get']('order');
        console.log(order);
      });
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
