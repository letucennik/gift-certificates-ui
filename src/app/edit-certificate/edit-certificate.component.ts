import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { CertificateService } from '../_services/certificate.service';
import { Tag } from '../model/tag';
import { GiftCertificate } from '../model/gift-certificate';
@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css']
})
export class EditCertificateComponent implements OnInit {
  certificateForm?: FormGroup;
  tags: string[] = [];
  tagName?: string;
  private certificateId?: number;

  constructor( private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private giftCertificateService:CertificateService) { }

  ngOnInit(): void {
    this.certificateForm = this.formBuilder.group({
      id: ['', Validators.nullValidator],
      name: ['',[ Validators.required,Validators.minLength(6)]],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', [ Validators.required,Validators.minLength(6)]],
      category: ['', Validators.nullValidator],
    });
    this.certificateId = this.activatedRoute.snapshot.params.id;
    this.giftCertificateService.findById(this.certificateId!).subscribe(
      (certificate) => {
        console.log(certificate);
        this.certificateForm!.patchValue({
          id: certificate.id,
          name: certificate.name,
          price: certificate.price,
          duration: certificate.duration,
          description: certificate.description,
        });
        this.tags = certificate.tags!.map(tag => tag.name);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addCertificateCategory(): void {
    this.tags.push(this.tagName!);
    this.tagName = '';
  }

  deleteCertificateCategory(tagName: any): void {
    this.tags = this.tags.filter(t => t !== tagName);
  }

  onSubmit(): void {
    const certificateTags = this.tags.map(tagName => {
      const tag = new Tag();
      tag.name = tagName;
      return tag;
    });

    const giftCertificate: GiftCertificate = {
      id:this.certificateId,
      name: this.certificateForm!.get('name')!.value,
      description: this.certificateForm!.get('description')!.value,
      price: this.certificateForm!.get('price')!.value,
      duration: this.certificateForm!.get('duration')!.value,
      lastUpdateDate: undefined,
      tags: certificateTags
    };
    console.log(giftCertificate);
    this.giftCertificateService.updateCertificate(giftCertificate).subscribe(certificate => {
      console.log(certificate);
      this.router.navigateByUrl('');
    }, error => {
      console.log(error);
    });
  }

  redirectToAllCertificates(): void {
   this.router.navigateByUrl('');
  }

}
