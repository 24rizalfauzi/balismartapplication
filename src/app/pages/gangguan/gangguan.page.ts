import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gangguan',
  templateUrl: './gangguan.page.html',
  styleUrls: ['./gangguan.page.scss'],
})
export class GangguanPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  tryAgain() {
  	(<any>window).open('/tabs', '_self')
  }

}
