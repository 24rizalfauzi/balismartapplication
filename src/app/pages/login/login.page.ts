import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  public errorMessage: any;
  public settings : any = JSON.parse(localStorage.getItem('settings'));
  public deferredPrompt : any;

  constructor(
    private apiService: ApiService,
    public config: ConfigService,
    public platform: Platform
  ) { }
  ngOnInit() {
    document.getElementById('downloadPwa').style.display = 'none';
    document.getElementById('appInstalled').style.display = 'none';
    document.getElementById('spinnerDownloadLink').style.display = 'block';
    document.getElementById('iphoneMessage').style.display = 'none';
    if(this.platform.is("ios")){
      document.getElementById('iphoneMessage').style.display = 'block';
      document.getElementById('spinnerDownloadLink').style.display = 'none';
    } else {
      console.log('!ios')
    }
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('masuk pak eko')
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      document.getElementById('spinnerDownloadLink').style.display = 'none';
      document.getElementById('downloadPwa').style.display = 'block';
    });
    //button click event to show the promt
    document.getElementById('downloadPwa').addEventListener('click', (e) => {
      // Hide the app provided install promotion
      // hideMyInstallPromotion();
      document.getElementById('downloadPwa').style.display = 'none';
      // Show the install prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          document.getElementById('appInstalled').innerHTML = 'You accepted the install prompt';
          document.getElementById('appInstalled').style.display = 'block';
        } else {
          document.getElementById('appInstalled').innerHTML = 'You dismissed the install prompt';
          document.getElementById('appInstalled').style.display = 'block';
        }
      })
    });
    window.addEventListener('appinstalled', (evt) => {
      console.log('Bali Smart Innovation installed');
    });
    window.addEventListener('load', () => {
      if (matchMedia('(display-mode: standalone)').matches) {
        document.getElementById('appInstalled').innerHTML = 'Bali Smart Innovation installed on your phone';
        document.getElementById('appInstalled').style.display = 'block';
        console.log('Launched: Installed');
      } else {
        console.log('Launched: Browser Tab');
      }
    });
    this.apiService.getSetToken().subscribe(
      (result: any) => {
          if(result.token!=undefined){
            localStorage.setItem('token', result.token)
            localStorage.setItem('settings', JSON.stringify(result.settings))
            let elem = document.querySelector('#content');
            elem.setAttribute("style", "--background: url('"+this.config.serverUrl+`/assets/settings/` + result.settings.background_login+"') no-repeat 0 0/auto 100%;");
            if(localStorage.getItem('user')!=undefined){
              (<any>window).open('/tabs', '_self');
            }
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
  login (form: NgForm) {
    var isFormValid = true;
    this.errorMessage = '';
    if(form.value.nip=='') {
      this.errorMessage = this.errorMessage + '<br>nip/email harus diisi<br>'
      isFormValid = false
    }
    if(form.value.password=='') {
      this.errorMessage = this.errorMessage + '<br>password harus diisi'
      isFormValid = false
    }

    if(isFormValid){
      var inputData = {
        nip : form.value.nip,
        password : form.value.password
      }
      this.apiService.postData('login', inputData).subscribe(
        (result: any) => {
          console.log(result)
            if (result.responseCode == false ) {
              this.errorMessage = result.responseMessage
            } else if (result.responseCode == true ) {
              localStorage.setItem('user', JSON.stringify(result.user));
              window.location.href = '/tabs'
            }
        },
        (err: HttpErrorResponse) => {
          console.log(err)
          this.apiService.gangguan(err)
        }
      );
    }
  }
  setServerUrl(serverForm: NgForm){
    this.apiService.getSetToken().subscribe(
      (result: any) => {
          console.log('result token ' + result)
          if(result.token!=undefined){
            localStorage.setItem('token', result.token)
          } else {
            console.log(result)
            this.apiService.gangguan(result)
          }
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.apiService.gangguan(err)
      }
    );
  }
}