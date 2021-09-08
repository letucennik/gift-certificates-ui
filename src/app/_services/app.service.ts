import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private subject = new Subject<any>();
    static token:string;
    constructor(private http: HttpClient) {
    }
    sendClickEvent(token:string) {
        AppService.token=token;
        this.subject.next();
    }

    sendReloadEvent(){
        this.subject.next();
    }

    getClickEvent(): Observable<any> {
        return this.subject.asObservable();
    }

    getReloadEvent(): Observable<any> {
        return this.subject.asObservable();
    }

}