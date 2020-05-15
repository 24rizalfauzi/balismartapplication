import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'
import {Router, ActivatedRoute, Params} from '@angular/router'
import { ModalPage } from '../modal/modal.page'
import { AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-forum-sharing-session',
  templateUrl: './forum-sharing-session.page.html',
  styleUrls: ['./forum-sharing-session.page.scss'],
})
export class ForumSharingSessionPage implements OnInit {
  public judul: any
  public latarBelakang:any
  public tujuan:any
  public costBenefitAnalysis: any
  public mentorId: any
  public mentorName: any
  public applicantId: any
  public applicantName: any
  public memberId: any
  public memberName: any
  public status: any
  public progress: any
  public jadwal: any

  public sharing:any
  public chatSharing: any
  public usersBiasa: any
  public members: any
  public user: any = JSON.parse(localStorage.getItem('user'))
  public sharingId: any
  public msgSubmitKomen: any
  public avatarUserUrl: any
  public komen: any
  public attachmentsSharing: any;
  public attachments: File[];
  public msgAttachment: any;

  public checked: any;

  public currentTimestamp :any = Date.now()
  public jadwalTimestamp : any

  public isChatActive : any = false

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public config: ConfigService
  ) {}

  ngOnInit() { 
    this.avatarUserUrl = this.config.serverUrl+`/assets/profile-pics/`
  	this.getPageForumSharing()
     var items:any = document.getElementsByClassName('ub');
      for (let i = 0; i < items.length; i++) {
          let element = items[i];
          element.style.display = 'none';
      }
    console.log(this.currentTimestamp)
    console.log(this.jadwal)
  }

  updateMembers() {
     this.alertUpdateMembers()    
  }

  addUsersSharing(form: NgForm){
    console.log(form.value)
  }

  getPageForumSharing() {

    this.activatedRoute.queryParams.subscribe(params => {
      const sharingId = parseInt(params['sharingId'])
      this.sharingId = sharingId
      var inputData = {
        activeUserId : this.user.id,
        sharingId : sharingId
      }
      this.apiService.postData('getPageForumSharing', inputData).subscribe(
        (result: any) => {
            if (result.responseCode == true ) {
              this.sharing = result.sharing
              this.chatSharing = result.chatSharing
              this.usersBiasa = result.usersBiasa
              this.members = result.members

              this.judul = result.sharing.judul
              this.latarBelakang = result.sharing.latarBelakang
              this.tujuan = result.sharing.tujuan
              this.costBenefitAnalysis = result.sharing.costBenefitAnalysis
              this.mentorId = result.sharing.mentorId
              this.mentorName = result.sharing.mentorName
              this.applicantId = result.sharing.applicantId
              this.applicantName = result.sharing.applicantName
              this.memberId = result.sharing.memberId
              this.memberName = result.sharing.memberName
              this.status = result.sharing.status
              this.progress = result.sharing.progress
              this.jadwal = result.sharing.jadwal
              this.attachmentsSharing = result.sharing.attachments
              if (Math.round(new Date(this.jadwal).getTime())<this.currentTimestamp) {
                this.isChatActive = true
              }
            }
        },
        (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
          console.log(err)
        }
      )
    })

  }

  async updateStatusSharing(sharingStatus, mentorId) {
    const alert = await this.alertController.create({
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
                mentorId : mentorId,
                sharingStatus : sharingStatus
              }
              this.apiService.postData('updateStatusSharing', inputData).subscribe(
                  (result: any) => {
                    if (result.responseCode == false) {
                    } else if (result.responseCode == true ) {
                       this.getPageForumSharing()
                    }
                  },
                  (err: HttpErrorResponse) => {
                    console.log(err)
                  }
              )
            }
          }
        ]
      });
      alert.present();
  }

  async submitKomenSharing() {
    var validInput = true
    if(this.komen==undefined) {
      validInput = false
      this.msgSubmitKomen = 'Komentar harus diisi'
      document.getElementById('stlMsgSubmitKomen').style.color = 'red'
    }
    if(validInput) {
      const inputData = new FormData()
      const files: Array<File> = this.attachments;
      if(files==undefined){
          inputData.append("attachments", undefined); 
      } else {
        for(let i =0; i < files.length; i++){
            inputData.append("attachments", files[i], files[i]['name']);
        }
      }
      inputData.append('komen', this.komen)
      inputData.append('userId', this.user.id)
      inputData.append('activeUserId', this.user.id)
      inputData.append('sharingId', this.sharingId)
    	this.apiService.postData('submitKomenSharing', inputData).subscribe(
	        (result: any) => {
            console.log(result)
	          if (result.responseCode == false) {
              this.msgSubmitKomen = result.responseMessage
              document.getElementById('stlMsgSubmitKomen').style.color = 'red'
	          } else if (result.responseCode == true ) {
	            this.msgSubmitKomen = result.responseMessage
              this.komen = ''
              this.attachments = undefined
              this.msgAttachment = ''
              document.getElementById('stlMsgSubmitKomen').style.color = 'green'
	            this.getPageForumSharing()
	          }
	        },
	        (err: HttpErrorResponse) => {
            console.log(err)
            this.apiService.gangguan(err)
	        }
	    )
    }
  }

  downloadAttachmentSharing(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentSharing/` + attachment, '_self');
  }

  downloadAttachmentChatSharing(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentChatSharing/` + attachment, '_self');
  }

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files;
    this.msgAttachment = attachments.target.files.length + " file" ;
  }

  async alertUpdateMembers() {
    var inputs = []
    for (var i = 0; i < this.usersBiasa.length; i++) {
      inputs.push({
        name: 'checkbox1',
        type: 'checkbox',
        label: this.usersBiasa[i].name,
        value: this.usersBiasa[i].id,
        checked: false
      })
    }
    const alert = await this.alertController.create({
      header: 'Checkbox',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var inputData = {
              activeUserId : this.user.id,
              sharingId : this.sharingId,
              applicantId : this.applicantId,
              mentorId : this.mentorId,
              membersId : data
            }
            this.apiService.postData('updateMembersSharing', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                  } else if (result.responseCode == true ) {
                    console.log(result)
                    this.members = result.members
                  }
                },
                (err: HttpErrorResponse) => {
                  console.log(err)
                }
            )
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header,subHeader,message,buttons) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }

  async selectJadwalByAdmin(form: NgForm) {
    var validInput = true
    if(this.jadwal==undefined) {
      validInput = false
      this.presentAlert('Info','Harus diisi', 'Harus pilih Jadwal!', 'OK')
    }
    if(validInput) {
      const alert = await this.alertController.create({
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
                    this.getPageForumSharing()
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

  showUsersBiasa() {
    this.presentAlertCheckbox()    
  }

  async presentAlertCheckbox() {
    var inputs = []
    for (var i = 0; i < this.usersBiasa.length; i++) {
      inputs.push({
        name: 'checkbox1',
        type: 'checkbox',
        label: this.usersBiasa[i].name,
        value: this.usersBiasa[i].id,
        checked: false
      })
    }
    const alert = await this.alertController.create({
      header: 'Pilih Member Lain',
      inputs: inputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var inputData = {
              activeUserId : this.user.id,
              ideId : this.sharingId,
              applicantId : this.applicantId,
              mentorId : this.mentorId,
              membersId : data
            }
            this.apiService.postData('updateMembersSharing', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                  } else if (result.responseCode == true ) {
                    console.log(result)
                    this.members = result.members
                  }
                },
                (err: HttpErrorResponse) => {
                  console.log(err)
                }
            )
          }
        }
      ]
    });

    await alert.present();
  }

}
