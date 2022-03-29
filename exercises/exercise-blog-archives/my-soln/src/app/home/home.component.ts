import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public archives = [
    {event: 'Battle of Hastings', year: 1066, month: 10},
    {event: 'Siege of Sevastopol', year: 1854, month: 11},
    {event: 'D-day Landings', year: 1944, month: 6},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
