import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit {

  constructor() { }
  private layout: any = 'alphanumeric';
  ngOnInit() {
    $("#default").keyboard();
  }

}
