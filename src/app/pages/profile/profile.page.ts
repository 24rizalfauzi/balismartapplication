import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'
import {Router, ActivatedRoute, Params} from '@angular/router'
import { ModalController } from '@ionic/angular'
import { ModalPage } from '../modal/modal.page'
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	public userId: any
  public userNip: any
	public userName: any
	public roleName: any
  public userStatus: any
  public userEmail: any
  public userPhoto: any
  public user: any = JSON.parse(localStorage.getItem('user'))

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController, 
    public config: ConfigService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const userId = params['userId']
      this.userId = userId
      var inputData = {
        activeUserId : this.user.id,
        userId : userId
      }
      this.apiService.postData('getUserById', inputData).subscribe(
        (result: any) => {
            if (result.responseCode == false ) {
              this.apiService.gangguan(result)
            } else if (result.responseCode == true ) {
              this.userNip = result.user.nip
              this.userName = result.user.name
              this.roleName = result.user.role
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

}
