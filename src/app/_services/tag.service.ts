import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Tag } from "../model/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tagUrl: string;
  constructor(private http: HttpClient) {
    this.tagUrl = environment.apiUrl + '/tags';
  }

  public findAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.tagUrl);
  }

  public read(id: string): Observable<Tag> {
    console.log(this.tagUrl + '/' + id);
    return this.http.get<Tag>(this.tagUrl + '/' + id);
  }

}