import { Component, OnInit } from '@angular/core';
import { GiftCertificate } from '../model/gift-certificate';
import {ActivatedRoute, Router} from '@angular/router';
import { CertificateService } from '../_services/certificate.service';
import { OrderService } from '../_services/order.service';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { OrderRequest } from '../model/order-request';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  certificate?: GiftCertificate;
  certificateId?: number;
  orders?: Order[] = [];
  usedCertificates: number[] = [];
  giftCertificate: GiftCertificate = new GiftCertificate();
  orderItem: OrderItem = new OrderItem();
  orderRequest: OrderRequest = new OrderRequest();
  orderItems: OrderItem[] = [];

  constructor( private activatedRoute: ActivatedRoute,
    private router: Router,
    private certificateService: CertificateService,
    private orderService:OrderService,
    public authService:AuthenticationService) { }

  ngOnInit(): void {
    this.certificateId = this.activatedRoute.snapshot.params.id;
    this.certificateService.findById(this.certificateId!)
    .subscribe(
      (certificate) => {
      console.log(certificate);
      this.certificate = certificate;
    },
    (error) => {
      console.log(error);
    });
    this.getUsedCertificates();
  }

  getUsedCertificates() {
    this.orderService.findAllUserOrders().subscribe(
      response => {
        this.orders = response;
        for (var order of this.orders) {
          for (var cert of order.certificates!) {
            this.usedCertificates.push(cert!.giftCertificate!.id!);
          }
        }
      }
    )
  }

  addCertificateToCart(id:number, quantity: number): void {
    if (!this.usedCertificates.includes(id)) {
      this.giftCertificate!.id = id;
      this.orderItem!.giftCertificate = this.giftCertificate;
      this.orderItem!.quantity = quantity;
      this.orderItems.push(this.orderItem!);
      this.orderRequest.certificates = this.orderItems;
      this.orderService.createOrder(this.orderRequest).subscribe(
        response => {
          console.log(response);
        }
      );
    }
    this.usedCertificates.push(id);
  }

  editCertificate(id:number){
    console.log(id);
    this.router.navigateByUrl(`/certificates/${id}/edit`);
  }

}
