import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public countNotif: any = localStorage.getItem('countNotif')

  constructor() {}

  logout() {
    localStorage.clear();
    window.location.href = '/'
  }
  
}
