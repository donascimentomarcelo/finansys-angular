import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('page-title') pageTitle: string;
  // tslint:disable-next-line:no-input-rename
  @Input('button-class') buttonClass: string;
  // tslint:disable-next-line:no-input-rename
  @Input('button-text') buttonText: string;
  // tslint:disable-next-line:no-input-rename
  @Input('button-link') buttonLink: string;

  constructor() { }

  ngOnInit() {
  }

}
