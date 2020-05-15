import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

	public user: any = JSON.parse(localStorage.getItem('user'));
  public settings: any = JSON.parse(localStorage.getItem('settings'));
  
  public backgroundLoginSrc : any;
  public backgroundLoginImg : any;
  public about : any;

  public msgBackgroundLoginImg : any

  constructor(public apiService: ApiService,public config: ConfigService) { }

  ngOnInit() {
    this.backgroundLoginSrc = this.config.serverUrl+`/assets/settings/` + this.settings.background_login
    this.about = this.settings.about
    console.log(this.backgroundLoginSrc)
  }

  getPageSettings(){
    this.apiService.getSetToken().subscribe(
      (result: any) => {
          if(result.token!=undefined){
            localStorage.setItem('token', result.token)
            localStorage.setItem('settings', JSON.stringify(result.settings))
            this.settings = JSON.stringify(result.settings)
            this.backgroundLoginSrc = this.config.serverUrl+`/assets/settings/` + result.settings.background_login
          } else {
            console.log(result)
            this.apiService.gangguan(result)
          }
      },
      (err: HttpErrorResponse) => {
        this.apiService.gangguan(err)
        console.log(err)
      }
    );
  }

  onChangeBackgroundLoginImg(event) {
    this.backgroundLoginImg = event.target.files[0];
    this.msgBackgroundLoginImg = "1 file" ;
  }

  submitUpdateSettings(){
    const data = new FormData()
    data.append('activeUserId', this.user.id)
    data.append('about', this.about)
    data.append('backgroundLoginImg', this.backgroundLoginImg)
    this.apiService.postData('updateSettings', data).subscribe(
      (result: any) => {
        if (result.responseCode == true ) {
          this.backgroundLoginImg = undefined
          this.msgBackgroundLoginImg = ''
          this.apiService.alert('Info','Sukses','Sukses Update Settings', 'OK')
          this.getPageSettings()
        }
      },
      (err: HttpErrorResponse) => {
        this.apiService.gangguan(err)
        console.log(err)
      }
    );
  }

}
