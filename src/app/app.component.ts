import { Component } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
//import { AppUpdate } from '@ionic-native/app-update/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public user: any = JSON.parse(localStorage.getItem('user'))

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private fcm: FCM,
    private backgroundMode: BackgroundMode,
    public loadingController: LoadingController
    //private appUpdate: AppUpdate
  ) {
    this.initializeApp();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  initializeApp() {
    this.presentLoading()
    // const updateUrl = 'https://bisonapk.rizalbekasi.com/update.xml';
    // this.appUpdate.checkAppUpdate(updateUrl).then(() => { this.apiService.alert('Pemberitahuan','','Update Available','OK'); });
    this.apiService.getSetToken().subscribe(
      (result: any) => {
          if(result.token!=undefined){
            localStorage.setItem('token', result.token)
            localStorage.setItem('settings', JSON.stringify(result.settings))
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
    var path = this.location.path();
    if(path=='/gangguan'){
      //lanjut
    } else if(localStorage.getItem('user')==null && path!='/login'){
      window.location.href = '/login'
    }
    this.platform.ready().then(() => {      
      this.backgroundMode.enable();
      if (this.user!=null) {
        this.apiService.postData('countNotif',{activeUserId:this.user.id,userId:this.user.id}).subscribe(
          (result: any) => {
            localStorage.setItem('countNotif', result.countNotif)
          },
          (err: HttpErrorResponse) => {
            this.apiService.gangguan(err)
            console.log(err)
          }
        );
        var platformName = ""

        if(this.platform.is("android")){
          platformName="android"
        }
        if(this.platform.is("ios")){
          platformName="ios"
        }
        if(this.platform.is("ipad")){
          platformName="ipad"
        }
        if(this.platform.is("iphone")){
          platformName="iphone"
        }
        if(this.platform.is("mobile")){
          platformName="mobile"
        }
        if(this.platform.is("phablet")){
          platformName="phablet"
        }
        if(this.platform.is("tablet")){
          platformName="tablet"
        }
        if (platformName!="") {
          console.log(this.platform)
          this.fcm.getToken().then(token =>
            this.apiService.postData('updateTokenFirebase', {activeUserId:this.user.id,userId:this.user.id,tokenFirebase:token}).subscribe()
          ).catch(error => 
            console.log(error)
            //this.apiService.postData('updateTokenFirebase', {activeUserId:this.user.id,userId:this.user.id,tokenFirebase:error}).subscribe()
          );
    
          this.fcm.onNotification().subscribe(data => 
            //this.apiService.alert('Pemberitahuan','',JSON.stringify(data),'OK');
            window.location.href = 'tabs/tab2'
            //this.router.navigate([data.landing_page, data.price])
          );
      
          this.fcm.onTokenRefresh().subscribe((token: string) => 
            this.apiService.postData('updateTokenFirebase', {activeUserId:this.user.id,userId:this.user.id,tokenFirebase:token}).subscribe()
          );
        }
        
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login'
  }

}
