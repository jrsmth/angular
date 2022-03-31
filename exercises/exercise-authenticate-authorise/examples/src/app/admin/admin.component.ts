import { OrdersService } from './../services/orders.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  orders: any;

  constructor(private router: Router, private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getOrders()
      .subscribe(orders => this.orders = orders);

    console.log(this.orders);
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

}
