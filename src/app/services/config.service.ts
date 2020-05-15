import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	
	public serverUrl: any = 'https://localhost:8512';
	//public serverUrl: any = 'https://192.168.108.6:8512';
	//public serverUrl: any = 'https://bisonmiddleware.rizalbekasi.com';

  	constructor() { }
}
