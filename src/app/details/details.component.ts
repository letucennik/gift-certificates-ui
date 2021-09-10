import { Component, OnInit } from '@angular/core';
import { GiftCertificate } from '../model/gift-certificate';
import { ActivatedRoute, Router } from '@angular/router';
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
  userOrder?: Order;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private certificateService: CertificateService,
    private orderService: OrderService,
    public authService: AuthenticationService) { }

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
    this.orderService.findAllUserOrders().subscribe(
      response => {
        if (response.length != 0) {
          this.userOrder = response[0];
        } 
      }
    )
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

  addCertificateToCart(id: number, quantity: number) {
    if (!this.usedCertificates.includes(id)) {
      this.giftCertificate!.id = id;
      this.orderItem!.giftCertificate = this.giftCertificate;
      this.orderItem!.quantity = quantity;
      this.orderItems.push(this.orderItem!);
      if (this.userOrder === undefined) {
        this.orderRequest.certificates = this.orderItems;
        this.orderService.createOrder(this.orderRequest).subscribe(
          response1 => {
            this.userOrder = response1;
          }
        );
        return;
      }
      this.orderService.addItemToOrder(this.userOrder?.id!, this.orderItem).subscribe();
    }
    this.usedCertificates.push(id);
  }

  editCertificate(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/certificates/${id}/edit`);
  }

}
