import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { JsonPipe } from '@angular/common';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import { AuthenticationService } from './authentication.service';
import { Order } from '../model/order';
import { OrderRequest } from '../model/order-request';
import { OrderItem } from '../model/order-item';
@Injectable({
    providedIn: 'root'
  })
export class OrderService{
    ordersUrl:string;

    constructor(private http: HttpClient,private authService:AuthenticationService) {
        this.ordersUrl = environment.apiUrl + '/users/'+this.authService.getId()+'/orders';
      }

      public createOrder(orderRequest:OrderRequest):Observable<Order>{
        return this.http.post<OrderRequest>(this.ordersUrl,orderRequest);
      }

      public addItemToOrder(orderId:number, orderItem:OrderItem){
        return this.http.post<Order>(environment.apiUrl + '/users/'+this.authService.getId()+'/'+'orders/'+orderId,orderItem);
      }

      public findAllUserOrders():Observable<Order[]>{
        return this.http.get<Order[]>( environment.apiUrl + '/users/'+this.authService.getId()+'/orders');
      }

      public changeStatus(orderId:number):Observable<Order>{
        return this.http.patch<Order>(this.ordersUrl+'/'+orderId,orderId);
      }

}