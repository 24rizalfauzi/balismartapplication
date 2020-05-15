import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'
import {Router, ActivatedRoute, Params} from '@angular/router'
import { ModalPage } from '../modal/modal.page'
import { AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-forum-ide',
  templateUrl: './forum-ide.page.html',
  styleUrls: ['./forum-ide.page.scss'],
})
export class ForumIdePage implements OnInit {
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


  public ide:any
  public chatIde: any
  public usersBiasa: any
  public members: any
  public mentors: any
  public user: any = JSON.parse(localStorage.getItem('user'))
  public ideId: any
  public msgSubmitKomen: any
  public avatarUserUrl: any
  public komen: any
  public attachmentsIde: any;
  public attachments: File[];
  public msgAttachment: any; 

  public checked: any;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController, 
    public config: ConfigService
  ) {}

  ngOnInit() { 
    this.avatarUserUrl = this.config.serverUrl+`/assets/profile-pics/`
  	this.getPageForumIde()
     var items:any = document.getElementsByClassName('ub');
      for (let i = 0; i < items.length; i++) {
          let element = items[i];
          element.style.display = 'none';
      }
  }

  showUsersBiasa() {
     this.presentAlertCheckbox()    
  }

  addUsersIde(form: NgForm){
    console.log(form.value)
  }

  getPageForumIde() {

    this.activatedRoute.queryParams.subscribe(params => {
      const ideId = parseInt(params['ideId'])
      this.ideId = ideId
      var inputData = {
        activeUserId : this.user.id,
        ideId : ideId
      }
      this.apiService.postData('getPageForumIde', inputData).subscribe(
        (result: any) => {
            if (result.responseCode == true ) {
              this.ide = result.ide
              this.chatIde = result.chatIde
              this.usersBiasa = result.usersBiasa
              this.members = result.members
              this.mentors = result.mentors

              this.judul = result.ide.judul
              this.latarBelakang = result.ide.latar_belakang
              this.tujuan = result.ide.tujuan
              this.costBenefitAnalysis = result.ide.costBenefitAnalysis
              this.mentorId = result.ide.mentorId
              this.mentorName = result.ide.mentorName
              this.applicantId = result.ide.applicantId
              this.applicantName = result.ide.applicantName
              this.memberId = result.ide.memberId
              this.memberName = result.ide.memberName
              this.status = result.ide.status
              this.progress = result.ide.progress
              this.attachmentsIde = result.ide.attachments
            }
        },
        (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
          console.log(err)
        }
      )
    })

  }

  downloadAttachmentIde(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentIde/` + attachment, '_self');
  }

  onChangeMentorId(mentorId, ideId) {
    this.ideId = ideId
    this.mentorId = mentorId
  }

  async selectMentorByRso(form: NgForm) {
    var validInput = true
    if(this.mentorId==undefined) {
      validInput = false
      this.presentAlert('Info','Harus diisi', 'Harus pilih mentor!', 'OK')
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
                ideId : this.ideId,
                mentorId : this.mentorId
              }
              this.apiService.postData('selectMentorByRso', inputData).subscribe(
                (result: any) => {
                  if (result.responseCode == false) {
                    this.presentAlert('Info','', result.responseMessage, 'OK')
                  } else if (result.responseCode == true ) {
                    this.getPageForumIde()
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
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [buttons]
    });

    await alert.present();
  }

  async rsoOrForumIde(ideId, ideStatus, mentorId){
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
              ideId : ideId,
              ideStatus : ideStatus,
              mentorId : mentorId
            }
            this.apiService.postData('rsoOrForumIde', inputData).subscribe(
              (result: any) => {
                if (result.responseCode == false) {
                  this.presentAlert('Info','', result.responseMessage, 'OK')
                } else if (result.responseCode == true ) {
                  this.getPageForumIde()
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

  async updateStatusIde(value) {
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
                ideId : this.ideId,
                ideStatus : value,
                mentorId : this.mentorId
              }
              this.apiService.postData('updateStatusIde', inputData).subscribe(
                  (result: any) => {
                    if (result.responseCode == false) {
                    } else if (result.responseCode == true ) {
                       this.getPageForumIde()
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

  async submitKomenIde() {
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
      inputData.append('activeUserId', this.user.id)
      inputData.append('userId', this.user.id)
      inputData.append('ideId', this.ideId)
    	this.apiService.postData('submitKomenIde', inputData).subscribe(
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
	            this.getPageForumIde()
	          }
	        },
	        (err: HttpErrorResponse) => {
            console.log(err)
            this.apiService.gangguan(err)
	        }
	    )
    }
  }

  downloadAttachment(attachment){
    (<any>window).open(this.config.serverUrl+`/api/downloadAttachmentChatIde/` + attachment, '_self');
  }

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files;
    this.msgAttachment = attachments.target.files.length + " file" ;
  }

  onChangeProgress(event) {
    var inputData = {
      activeUserId : this.user.id,
      ideId : this.ideId,
      ideProgress : event.target.value
    }
    this.apiService.postData('changeProgressIde', inputData).subscribe(
        (result: any) => {
          if (result.responseCode == false) {
          } else if (result.responseCode == true ) {
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err)
        }
    )
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
              ideId : this.ideId,
              applicantId : this.applicantId,
              mentorId : this.mentorId,
              membersId : data
            }
            this.apiService.postData('updateMembersIde', inputData).subscribe(
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
