import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orders:Order[]=[];
  overallCost:number=0;

  constructor(private orderService:OrderService) { 
  }

  ngOnInit(): void {
    this.getOrders();
    console.log(this.overallCost);
  }

  getOrders(){
    this.orderService.findAllUserOrders().subscribe(
      response=>{
        this.orders=response;
        response.forEach(x=>this.overallCost+=x.cost!);
      }
    )
  }

  submit(){
   this.orders.forEach(order=>this.orderService.changeStatus(order.id!).subscribe(
     response=>{
      order=response;
     }
   ));
   window.location.reload();
   
  }

}
