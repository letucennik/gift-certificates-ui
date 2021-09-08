import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GiftCertificate } from "../model/gift-certificate";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  certificateUrl: string;
  static partInfo?: string="";
  partInformation?:string="";
  static tagName?:string="";

  constructor(private http: HttpClient) {
    this.partInformation="";
    this.certificateUrl = environment.apiUrl + '/certificates';
  }

  public findAll(page?: number, pageSize?: number): Observable<GiftCertificate[]> {
    if (CertificateService.partInfo === "") {
      return this.http.get<GiftCertificate[]>(this.certificateUrl + '?' + 'page=' + page + '&size=' + pageSize+'&order=DESC');
    } else {
      this.partInformation=CertificateService.partInfo;
      CertificateService.partInfo="";
      if(CertificateService.tagName!="All categories"){
      return this.http.get<GiftCertificate[]>(this.certificateUrl + '?' + 'page=' + page + '&size=' + 10000+'&part_info='+this.partInformation+'&tag_name='+CertificateService.tagName+'&order=DESC');
      } else{
        return this.http.get<GiftCertificate[]>(this.certificateUrl + '?' + 'page=' + page + '&size=' + 10000+'&part_info='+this.partInformation+'&order=DESC');
      }
    }
  }

  public findByTagName(): Observable<GiftCertificate[]>{
      return this.http.get<GiftCertificate[]>(this.certificateUrl+'?'+'page='+0+'&size='+10000+'&tag_name='+CertificateService.tagName);
  }

  public findById(certificateId:number):Observable<GiftCertificate>{
    return this.http.get<GiftCertificate>(this.certificateUrl+'/'+certificateId);
  }

 public createCertificate(certificate: GiftCertificate): Observable<GiftCertificate> {
    return this.http.post<GiftCertificate>(this.certificateUrl, certificate);
  }

  public delete(id:number) : Observable<GiftCertificate> {
    return this.http.delete<GiftCertificate>(this.certificateUrl+'/'+id);
  }
  public updateCertificate(certificate: GiftCertificate): Observable<GiftCertificate> {
    return this.http.patch<GiftCertificate>(this.certificateUrl+'/'+certificate.id, certificate);
  }

}
