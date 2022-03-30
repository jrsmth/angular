import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public event = '';
  public year = '';
  public month = '';

  constructor(
      private route: ActivatedRoute, 
      private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.event = (params.get('event') !== null ? params.get('event') : '')!; // type-guarding + non-null assertion
        this.year = (params.get('year') !== null ? params.get('year') : '')!; // type-guarding + non-null assertion
        this.month = (params.get('month') !== null ? params.get('month') : '')!; // type-guarding + non-null assertion
      })
  }

  navigate(path: string) {
    this.router.navigate([path], {
      queryParams: { page: 1, order: 'newest' } // dummy query params
    });
  }

}
