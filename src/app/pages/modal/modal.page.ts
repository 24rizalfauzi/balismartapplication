import { Component, Input, OnInit } from '@angular/core'
import { NavParams } from '@ionic/angular'
import {Router, ActivatedRoute, Params} from '@angular/router'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { ApiService } from 'src/app/services/api.service'
import { NgForm } from '@angular/forms'
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

	public modalName : any
  public userId : any
  public userNip : any
  public userPassword : any
  public userName : any
  public userRole : any
  public userStatus : any
  public userEmail : any
  public userPhoto : any
  public newPhoto : any
  public msgPhoto : any
  public user: any = JSON.parse(localStorage.getItem('user'))

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public config: ConfigService
  ) { }

  ngOnInit() {
  	this.readParams()
  }

  readParams(){
  	this.activatedRoute.queryParams.subscribe(params => {
  	  this.modalName = params['modalName']
      this.userId = params['userId']
      var inputData = {
        activeUserId : this.user.id,
        userId : params['userId']
      }
      this.apiService.postData('getUserById', inputData).subscribe(
        (result: any) => {
          console.log(result)
            if (result.responseCode == false ) {
              console.log(result.responseCode)
            } else if (result.responseCode == true ) {
              this.userNip = result.user.nip
              this.userName = result.user.name
              this.userRole = result.user.role
              this.userStatus = result.user.status
              this.userEmail = result.user.email
              this.userPhoto = this.config.serverUrl+`/assets/profile-pics/`+result.user.photo
            }
        },
        (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
        }
      )
    })
  }

  submitUpdateProfile(form: NgForm) {
    const profileForm = new FormData()
    profileForm.append('activeUserId', this.user.id)
    profileForm.append('userId', this.userId)
    profileForm.append('userNip', this.userNip)
    profileForm.append('userRole', this.userRole)
    profileForm.append('userPassword', this.userPassword)
    profileForm.append('userName', this.userName)
    profileForm.append('userEmail', this.userEmail)
    profileForm.append('userStatus', this.userStatus)
    profileForm.append('userPhoto', this.newPhoto)
    this.apiService.postData('updateUser', profileForm).subscribe(
        (result: any) => {
          if (result.responseCode == false) {
            console.log(result)
          } else if (result.responseCode == true ) {
            (<any>window).open('/tabs/profile?userId='+this.userId, '_self')
          }
        },
        (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
        }
    )
  }

  getFiles(event) {
    this.newPhoto = event.target.files[0]
    this.msgPhoto = event.target.files.length + " file" ;
  }

}
