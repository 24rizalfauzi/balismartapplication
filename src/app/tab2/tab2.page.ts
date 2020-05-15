import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ApiService } from 'src/app/services/api.service'
import { NgForm } from '@angular/forms'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import { ConfigService } from 'src/app/services/config.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public mode: any = 'CREATE'
  public notifId: any = ''
  public message: any = ''
  public stlMsgInsertNotif: any
  public msgInsertNotif: any = ""
  public user: any = JSON.parse(localStorage.getItem('user'))
  public notifications: any
  public attachments: File[]
  public attachmentsUpdate: any
  public msgAttachment: any 
  public attachmentUrl: any

  constructor(
    public apiService: ApiService, public alertCtrl: AlertController, public router: Router, public config: ConfigService
  ) {}

  ngOnInit() {
    this.attachmentUrl = this.config.serverUrl+`/assets/attachments-notif`
    this.getPageNotif()
  }

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files
    this.msgAttachment = attachments.target.files.length + " file" 
  }

  getPageNotif(){
    this.apiService.postData('getPageNotif', {activeUserId:this.user.id}).subscribe(
      (result: any) => {
        console.log(result)
        if (result.responseCode == true ) {
          this.notifications = result.notifications
        }
      },
      (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
          console.log(err)
      }
    )
  }

  downloadAttachmentNotif(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentNotif/` + attachment, '_self')
  }

  async insertNotif(){
    var validForm = true
    if (this.message=='') {
      validForm = false
      this.msgInsertNotif = 'Pesan Harus diisi'
      document.getElementById('stlMsgInsertNotif').style.color = 'red'
    }
    if(validForm) {
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
              const files: Array<File> = this.attachments
              if(files==undefined){
                  inputData.append("attachments", undefined) 
              } else {
                for(let i =0; i < files.length; i++){
                    inputData.append("attachments", files[i], files[i]['name'])
                }
              }
              inputData.append('activeUserId', this.user.id)
              inputData.append('message', this.message)
              if (this.mode=='CREATE') {
                var endpoint = 'insertNotif'
              } else {
                var endpoint = 'updateNotif'
                inputData.append('id', this.notifId)
              }
              this.apiService.postData(endpoint, inputData).subscribe(
                (result: any) => {       
                  if (result.responseCode == true ) {
                    this.message = ""
                    this.msgInsertNotif = result.responseMessage
                    document.getElementById('stlMsgInsertNotif').style.color = 'green'
                    this.getPageNotif()
                  }
                },
                (err: HttpErrorResponse) => {
                    this.apiService.gangguan(err)
                    console.log(err)
                }
              )
            }
          }
        ]
      })
      alert.present()
    }
  }

  modeUpdate(id){
    document.querySelector('ion-content').scrollToTop(500);
    for (var i = 0; i < this.notifications.length; i++){
      if (this.notifications[i].id == id){
        this.notifId = this.notifications[i].id
        this.message = this.notifications[i].message
        this.attachmentsUpdate = this.notifications[i].attachments
        //this.attachments = 
      }
    }
    //var attachmentsUpdate = this.attachmentsUpdate.split(",")
    //console.log(this.attachmentsUpdate)
    this.mode = 'UPDATE'
    this.attachments = undefined
    this.msgAttachment = this.attachmentsUpdate.length + ' file'
  }

  modeCreate(){
    document.querySelector('ion-content').scrollToTop(50000);
    this.mode = 'CREATE'
    this.message = ''
    this.attachmentsUpdate = undefined
    this.msgAttachment = ''
  }

}
