import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: any;
  shipping: any = {};
  userId: string = '';
  userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe((user: any) => this.userId = user.uid)
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
