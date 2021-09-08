import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jqueryScript:HTMLScriptElement;
  popperScript:HTMLScriptElement;
  bootstrapScript:HTMLScriptElement;
  title = 'gift-certificates';
  constructor(){
    this.jqueryScript=document.createElement("script");
    this.jqueryScript.src="https://code.jquery.com/jquery-3.3.1.slim.min.js";
    this.jqueryScript.integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo";
    this.jqueryScript.crossOrigin="anonymous";

    this.popperScript=document.createElement("script");
    this.popperScript.src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js";
    this.popperScript.integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1";
    this.popperScript.crossOrigin="anonymous";

    this.bootstrapScript=document.createElement("script");
    this.bootstrapScript.src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js";
    this.bootstrapScript.integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM";
    this.bootstrapScript.crossOrigin="anonymous";

    document.body.appendChild(this.jqueryScript);
    document.body.appendChild(this.popperScript);
    document.body.appendChild(this.bootstrapScript);
  }
}
