import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-sharing-session',
  templateUrl: './sharing-session.page.html',
  styleUrls: ['./sharing-session.page.scss'],
})
export class SharingSessionPage implements OnInit {

  public judul: any;
  public latarBelakang: any;
  public tujuan: any;
  public costBenefitAnalysis: any;

  public msgSubmitNewSharingSession: any = '';
  public msgSelectMentor: any;
  public stlMsgSubmitNewSharingSession: any;
  public applicantSharing: any;
  public mentors: any;
  public mentorId: any = undefined;
  public sharingId: any = undefined;
  public user: any = JSON.parse(localStorage.getItem('user'));
  public jadwal: any;
  public currentTimestamp :any = Date.now()
  public attachments: File[];
  public msgAttachment: any; 

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files;
    this.msgAttachment = attachments.target.files.length + " file" ;
  }

  constructor(
    public apiService: ApiService, public alertCtrl: AlertController, public router: Router, public config: ConfigService
  ) { }

  ngOnInit() {
    this.getPageSharing()
  }
  downloadAttachment(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentChatSharing/` + attachment, '_self');
  }
  getPageSharing() {
    this.apiService.postData('getPageSharing', {activeUserId:this.user.id,userId:this.user.id,userRole:this.user.role}).subscribe(
      (result: any) => {
        if (result.responseCode == true ) {
          this.applicantSharing = result.applicantSharing
          this.mentors = result.mentors
        }
      },
      (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
          console.log(err)
      }
    );
  }
  async submitNewSharingSession(form: NgForm) {
    var isFormValid = true
    console.log(form.value)
    if(!form.value.judul||form.value.judul=='') {
      isFormValid = false
      this.msgSubmitNewSharingSession = 'Judul harus diisi';
    }
    if(!form.value.mentorId||form.value.mentorId=='') {
      this.msgSubmitNewSharingSession = this.msgSubmitNewSharingSession + '<br>Mentor harus diisi'
      isFormValid = false
    }
    if(!form.value.latarBelakang||form.value.latarBelakang=='') {
      isFormValid = false
      this.msgSubmitNewSharingSession = this.msgSubmitNewSharingSession+'<br>Latar Belakang harus diisi';
    }
    if(!form.value.tujuan||form.value.tujuan=='') {
      isFormValid = false
      this.msgSubmitNewSharingSession = this.msgSubmitNewSharingSession+'<br>Tujuan harus diisi';
    }
    if(!form.value.costBenefitAnalysis||form.value.costBenefitAnalysis=='') {
      isFormValid = false
      this.msgSubmitNewSharingSession = this.msgSubmitNewSharingSession+'<br>Cost Benefit Analysis harus diisi';
    }
    document.getElementById('msgSubmitNewSharingSession').style.color = 'red';
    if(isFormValid) {
      const alert = await this.alertCtrl.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin?',
        buttons: [
          {
            text: 'Tidak',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Ya',
            handler: () => {
              const inputData = new FormData()
              const files: Array<File> = this.attachments;
              if(files==undefined){
                  inputData.append("attachments", undefined); 
              } else {
                for(let i =0; i < files.length; i++){
                    inputData.append("attachments", files[i], files[i]['name']);
                }
              }
              inputData.append('judul', form.value.judul)
              inputData.append('latarBelakang', form.value.latarBelakang)
              inputData.append('tujuan', form.value.tujuan)
              inputData.append('costBenefitAnalysis', form.value.costBenefitAnalysis)
              inputData.append('mentorId', form.value.mentorId)
              inputData.append('applicantId', this.user.id)
              inputData.append('activeUserId', this.user.id)
              this.apiService.postData('submitNewSharing', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                    this.msgSubmitNewSharingSession = result.responseMessage;
                    document.getElementById('msgSubmitNewSharingSession').style.color = 'red';
                  } else if (result.responseCode == true ) {
                    this.msgSubmitNewSharingSession = result.responseMessage;
                    this.judul = ''
                    this.latarBelakang = ''
                    this.tujuan = ''
                    this.costBenefitAnalysis = ''
                    this.attachments = undefined
                    this.msgAttachment = ''
                    this.mentorId = undefined
                    document.getElementById('msgSubmitNewSharingSession').style.color = 'green';
                    this.getPageSharing()
                  }
                },
                (err: HttpErrorResponse) => {
                    this.apiService.gangguan(err)
                    console.log(err)
                }
              );
            }
          }
        ]
      });
      alert.present();
    }
  }
  async presentAlert(header,subHeader,message,buttons) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }

  async goToForumSharingSession(sharingId){
    this.router.navigate(['/tabs/forum-sharing-session'],{ queryParams: {sharingId: sharingId}});
  }

  async selectJadwalByAdmin(form: NgForm) {
    var validInput = true
    if(this.jadwal==undefined) {
      validInput = false
      this.presentAlert('Info','Harus diisi', 'Harus pilih Jadwal!', 'OK')
    }
    if(validInput) {
      const alert = await this.alertCtrl.create({
        header: 'Konfirmasi',
        message: 'Apakah Anda yakin?',
        buttons: [
          {
            text: 'Tidak',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
            }
          }, {
            text: 'Ya',
            handler: () => {
              var inputData = {
                activeUserId : this.user.id,
                sharingId : this.sharingId,
                jadwal : this.jadwal
              }
              this.apiService.postData('selectJadwalSharingByAdmin', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                    this.presentAlert('Info','', result.responseMessage, 'OK')
                  } else if (result.responseCode == true ) {
                    this.getPageSharing()
                  }
                },
                (err: HttpErrorResponse) => {
                    console.log(err)
                    this.apiService.gangguan(err)
                }
              );
            }
          }
        ]
      });
      alert.present();
    }
  } 

  onChangeJadwal(sharingId,jadwal) {
    this.sharingId = sharingId
    this.jadwal = jadwal
    console.log(this.sharingId)
    console.log(this.jadwal)
  }

}
