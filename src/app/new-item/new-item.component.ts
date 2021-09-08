import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { GiftCertificate } from '../model/gift-certificate';
import { CertificateService } from '../_services/certificate.service';
import { Tag } from '../model/tag';
@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {
  certificateForm?: FormGroup;
  tags: string[] = [];
  tagName?: string;
  picture?:string;
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private giftCertificateService: CertificateService,) { }

  ngOnInit(): void {
    this.certificateForm = this.formBuilder.group({
      name: ['',[ Validators.required,Validators.minLength(6)]],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', [ Validators.required,Validators.minLength(6)]],
      category: ['', Validators.nullValidator],
      picture:['']
    });
  }
  onSubmit(event:any): void {
    const certificateTags = this.tags.map(tagName => {
      const tag = new Tag();
      tag.name = tagName;
      return tag;
    });
    this.picture=event.target.picture.value;
    this.picture="assets/"+this.picture!.replace(/^.*\\/, "")
    const giftCertificate: GiftCertificate = {
      id: undefined,
      name: this.certificateForm!.get('name')!.value,
      description: this.certificateForm!.get('description')!.value,
      price: this.certificateForm!.get('price')!.value,
      duration: this.certificateForm!.get('duration')!.value,
      createDate: undefined,
      lastUpdateDate: undefined,
      tags: certificateTags,
      picture:this.picture
    };

    console.log(giftCertificate);
    this.giftCertificateService.createCertificate(giftCertificate).subscribe(certificate => {
      console.log(certificate);
      this.router.navigateByUrl('');
    }, error => {
      console.log(error);
    });
  }

  addCertificateCategory(): void {
    this.tags.push(this.tagName!);
    console.log(this.tags);
    this.tagName = '';
  }

  deleteCertificateCategory(tagName: any): void {
    this.tags = this.tags.filter(t => t !== tagName);
  }
 
  redirectToAllCertificates(): void {
    this.router.navigateByUrl('');
  }


}
