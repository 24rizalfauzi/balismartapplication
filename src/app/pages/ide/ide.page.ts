import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-ide',
  templateUrl: './ide.page.html',
  styleUrls: ['./ide.page.scss'],
})
export class IdePage implements OnInit {

  public judul: any;
  public latarBelakang: any;
  public tujuan: any;
  public costBenefitAnalysis: any;

  public msgSubmitNewIde: any;
  public msgSelectMentor: any;
  public stlMsgSubmitNewIde: any;
  public applicantIde: any;
  public mentors: any;
  public mentorId: any = undefined;
  public ideId: any = undefined;
  public user: any = JSON.parse(localStorage.getItem('user'));
  public attachments: File[];
  public config: ConfigService
  public msgAttachment: any; 

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files;
    this.msgAttachment = attachments.target.files.length + " file" ;
  }

  downloadAttachment(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentIde/` + attachment, '_self');
  }

  constructor(
  	public apiService: ApiService, public alertCtrl: AlertController, public router: Router
  ) { }

  ngOnInit() {
    this.getPageIde()
  }
  getPageIde() {
    this.apiService.postData('getPageIde', {activeUserId:this.user.id,userId:this.user.id,userRole:this.user.role}).subscribe(
      (result: any) => {
        if (result.responseCode == true ) {
          this.applicantIde = result.applicantIde
          this.mentors = result.mentors
        }
      },
      (err: HttpErrorResponse) => {
        this.apiService.gangguan(err)
        console.log(err)
      }
    );
  }
  async submitNewIde(form: NgForm) {
    var validInput = true
    this.msgSubmitNewIde = ''
    if(!form.value.judul||form.value.judul=='') {
      validInput = false
      this.msgSubmitNewIde = '<br>Judul harus diisi';
    }
    if(!form.value.latarBelakang||form.value.latarBelakang=='') {
      validInput = false
      this.msgSubmitNewIde = this.msgSubmitNewIde+'<br>Latar Belakang harus diisi';
    }
    if(!form.value.tujuan||form.value.tujuan=='') {
      validInput = false
      this.msgSubmitNewIde = this.msgSubmitNewIde+'<br>Tujuan harus diisi';
    }
    if(!form.value.costBenefitAnalysis||form.value.costBenefitAnalysis=='') {
      validInput = false
      this.msgSubmitNewIde = this.msgSubmitNewIde+'<br>Cost Benefit Analysis harus diisi';
    }
    document.getElementById('msgSubmitNewIde').style.color = 'red';
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
              inputData.append('applicantId', this.user.id)
              inputData.append('activeUserId', this.user.id)
              this.apiService.postData('submitNewIde', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                    this.msgSubmitNewIde = result.responseMessage;
                    document.getElementById('msgSubmitNewIde').style.color = 'red';
                  } else if (result.responseCode == true ) {
                    this.msgSubmitNewIde = result.responseMessage;
                    this.judul = ''
                    this.latarBelakang = ''
                    this.tujuan = ''
                    this.costBenefitAnalysis = ''
                    this.attachments = undefined
                    this.msgAttachment = ''
                    document.getElementById('msgSubmitNewIde').style.color = 'green';
                    this.getPageIde()
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
  async selectMentorByRso(form: NgForm) {
    var validInput = true
    if(this.mentorId==undefined) {
      validInput = false
      this.presentAlert('Info','Harus diisi', 'Harus pilih mentor!', 'OK')
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
                ideId : this.ideId,
                mentorId : this.mentorId
              }
              this.apiService.postData('selectMentorByRso', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                    this.presentAlert('Info','', result.responseMessage, 'OK')
                  } else if (result.responseCode == true ) {
                    this.getPageIde()
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
  onChangeMentorId(mentorId, ideId) {
    this.ideId = ideId
    this.mentorId = mentorId
  }
  goToForumIde(ideId, status){
    this.router.navigate(['/tabs/forum-ide'],{ queryParams: {ideId: ideId}});
  }
  async rsoOrForumIde(ideId, ideStatus, mentorId){
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
              ideId : ideId,
              ideStatus : ideStatus,
              mentorId : mentorId
            }
            this.apiService.postData('rsoOrForumIde', inputData).subscribe(
              (result: any) => {
                if (result.responseCode == false) {
                  this.presentAlert('Info','', result.responseMessage, 'OK')
                } else if (result.responseCode == true ) {
                  this.getPageIde()
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
