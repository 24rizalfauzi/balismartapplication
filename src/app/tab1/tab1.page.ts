import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	public user: any = JSON.parse(localStorage.getItem('user'));

	constructor(public alertController: AlertController) {}

	ngOnInit() {
		
	}

}
