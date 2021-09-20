import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order?: Order;
  overallCost: number = 0;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.getOrder();
    console.log(this.overallCost);
  }

  getOrder() {
    this.orderService.findAllUserOrders().subscribe(
      response => {
        this.order = response[0];
        for (let cert of this.order!.certificates!) {
          console.log(cert);
          this.overallCost += cert!.giftCertificate!.price!;
        }
      }
    )
  }

  submit() {
    this.orderService.changeStatus(this.order!.id!).subscribe();
    window.location.reload();
  }

}
