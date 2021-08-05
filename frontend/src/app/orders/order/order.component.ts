import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  constructor(public service: OrderService) {}

  ngOnInit(): void {}
}
