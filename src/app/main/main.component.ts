import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tag } from "../model/tag";
import { TagService } from '../_services/tag.service';
import { CertificateService } from '../_services/certificate.service';
import { GiftCertificate } from '../model/gift-certificate';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs'
import { AppService } from '../_services/app.service';
import { debounceTime } from 'rxjs/operators';
import { OrderService } from '../_services/order.service';
import { OrderItem } from '../model/order-item';
import { OrderRequest } from '../model/order-request';
import { Order } from '../model/order';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tags: Tag[] = [];

  clickEventSubscription: Subscription;

  @ViewChild("scrollToTopButton")
  scrollToTopBtn?: ElementRef;

  @ViewChild("searchInput")
  searchInput?: ElementRef;

  rootElement = document.documentElement

  previousLength = 0;
  newLength = 0;
  page = 0;
  size = 40000;
  deltaSize = 4;
  orderItems: OrderItem[] = [];
  certificates: GiftCertificate[] = [];
  allCertificates: GiftCertificate[] = [];
  loadedCertificates: GiftCertificate[] = [];
  giftCertificate: GiftCertificate = new GiftCertificate();
  orderItem: OrderItem = new OrderItem();
  orderRequest: OrderRequest = new OrderRequest();
  userOrder?: Order;
  orders?: Order[] = [];
  usedCertificates: number[] = [];

  notEmptyCertificate = true;
  notScrolly = true;
  partInfo?: string;


  constructor(private tagService: TagService, private certificateService: CertificateService, private orderService: OrderService, private spinner: NgxSpinnerService, private sharedService: AppService, private router: Router,
    public authService: AuthenticationService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      CertificateService.partInfo = AppService.token;
      this.search();
    })
    this.orderService.findAllUserOrders().subscribe(
      response => {
        if (response.length != 0) {
          this.userOrder = response[0];
        } 
      }
    )
    console.log(this.userOrder);
  }


  ngOnInit(): void {
    this.getCertificates();
    this.getTags();
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

  deleteCertificate(id: number) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      this.certificateService.delete(id).subscribe();
    }
  }



  addToCart(id: number, quantity: number) {
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



  filter(str: string) {
    this.certificates = [];
    CertificateService.tagName = str;
    this.certificateService.findByTagName().pipe(debounceTime(1000)).subscribe(reponse => {
      this.certificates = reponse;
    });
    this.notScrolly = false;
  }

  redirectToCertificateDetails(certificateId: number): void {
    this.router.navigateByUrl(`/certificates/${certificateId}`);
  }

  scrollToTop() {
    // Scroll to top logic
    this.rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  search(): void {
    this.certificates = [];
    this.getCertificates();

    this.notScrolly = false;
  }


  getTags() {
    this.tagService.findAll().subscribe(response => {
      this.tags = response;
    });
  }

  getCertificates() {
    this.certificateService.findAll(this.page, this.size).subscribe(response => {
      this.allCertificates = response.reverse();
      this.size = response.length;
      for (let i = 0; i < this.deltaSize; i++) {
        if (this.allCertificates[i] != undefined) {
          this.certificates.push(this.allCertificates[i]);
        }
      }
    })

  }

  onScroll() {
    if (this.notScrolly && this.notEmptyCertificate) {
      this.spinner.show();
      this.notScrolly = false;
      this.showNext();
    }
  }

  showNext() {
    console.log(this.allCertificates.length + "lala" + this.certificates.length);
    if (this.allCertificates.length >= this.certificates.length) {
      for (let i = this.deltaSize; i < this.deltaSize + 4; i++) {
        setTimeout(() => {
          if (this.allCertificates[i] != undefined) {
            this.certificates.push(this.allCertificates[i])
          };
        }, 1000);
      }
      this.deltaSize += 4;
    } else {
      this.notEmptyCertificate = true;
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.notScrolly = true;

  }

}
