import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ConfigService } from 'src/app/services/config.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(public http: HttpClient, public storage: NativeStorage, public config: ConfigService, public alertController: AlertController) {
    }

    public getSetToken() {
        return this.http.get(this.config.serverUrl+`/api/token`)
    }

    public postData(destinationApi: any, inputData: any) {
        const urlsend = this.config.serverUrl + `/api/` + destinationApi;
        var data = this.http.post(urlsend, inputData, { headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')) })
        return data
    }

    public async gangguan(err) {
      const alert = await this.alertController.create({
        header: 'Info',
        subHeader: 'Gangguan',
        message: `Pastikan koneksi internet Anda terhubung ke jaringan kantor. Tanyakan kepada teknisi apakah server sedang down? Atau hubungi administrator. Error : ` + JSON.stringify(err),
        buttons: ['OK']
      });
      await alert.present();
    }

    public async alert(header, subHeader, message, buttons) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [buttons]
      });
      await alert.present();
    }

}