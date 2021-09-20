import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tag } from "../model/tag";
import { TagService } from '../_services/tag.service';
import { Router } from '@angular/router';
import { CertificateService } from '../_services/certificate.service';
import { AppService } from '../_services/app.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tags: Tag[] = [];
  selectedOption?: string = "All categories";

  selectedTag?: Tag;

  timeout: any = null;
  constructor(private tagService: TagService, private router: Router, private sharedService: AppService, public authService: AuthenticationService,) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.tagService.findAll().subscribe(response => {
      this.tags = response;
    });
  }

  refresh() {
    this.sharedService.sendReloadEvent();
  }

  selectChangeHandler(event: any) {
    //update the ui
    CertificateService.tagName = event.target.value;
  }


  search(event: any): void {
    clearTimeout(this.timeout);
    var $this = this;//debounce
    if (event.keyCode != 13) {
      $this.doSearch(event.target.value);
    }

  }

  doSearch(token: string) {
    CertificateService.partInfo = token;
    if (this.router.url == "/") {
      this.sharedService.sendClickEvent(token);
    } else {
      this.router.navigate(['']);
    }
  }

}
