import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, TemplateRef, ViewEncapsulation } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { NgForm } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'
import {Router, ActivatedRoute, Params} from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-pegawai',
  templateUrl: './pegawai.page.html',
  styleUrls: ['./pegawai.page.scss'],
})
export class PegawaiPage implements OnInit {

  public userNip : any = ''
  public userPassword : any = ''
  public userName : any = ''
  public userRole : any = ''
  public userEmail : any = ''
  public msgSubmitCreateUser : any = ''
  public user: any = JSON.parse(localStorage.getItem('user'))
  public pegawai: any
  public photoUrl: any

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController, 
    public config: ConfigService
  ) { }

  ngOnInit() {
    this.photoUrl = this.config.serverUrl+`/assets/profile-pics`
    this.getPagePegawai()
  }

  getPagePegawai() {

    this.activatedRoute.queryParams.subscribe(params => {
      var inputData = {
        activeUserId : this.user.id,
      }
      this.apiService.postData('getPagePegawai', inputData).subscribe(
        (result: any) => {
            if (result.responseCode == true ) {
              this.pegawai = result.pegawai
            }
        },
        (err: HttpErrorResponse) => {
          this.apiService.gangguan(err)
          console.log(err)
        }
      )
    })

  }

  submitCreateUser(form: NgForm) {
    
    var validInput = true
    this.msgSubmitCreateUser = ''
    if(!form.value.userNip||form.value.userNip=='') {
      validInput = false
      this.msgSubmitCreateUser = '<br>NIP harus diisi';
    }
    if(!form.value.userRole||form.value.userRole=='') {
      validInput = false
      this.msgSubmitCreateUser = this.msgSubmitCreateUser+'<br>Role harus diisi';
    }
    if(!form.value.userPassword||form.value.userPassword=='') {
      validInput = false
      this.msgSubmitCreateUser = this.msgSubmitCreateUser+'<br>Password harus diisi';
    }
    if(!form.value.userName||form.value.userName=='') {
      validInput = false
      this.msgSubmitCreateUser = this.msgSubmitCreateUser+'<br>Nama harus diisi';
    }
    if(!form.value.userEmail||form.value.userEmail=='') {
      validInput = false
      this.msgSubmitCreateUser = this.msgSubmitCreateUser+'<br>Email harus diisi';
    }
    document.getElementById('msgSubmitCreateUser').style.color = 'red';
    if(validInput) {
      var profileForm = {
        activeUserId : this.user.id,
        nip : form.value.userNip,
        role : form.value.userRole,
        password : form.value.userPassword,
        name : form.value.userName,
        email : form.value.userEmail,
      }
      this.apiService.postData('createUser', profileForm).subscribe(
          (result: any) => {
            if (result.responseCode == false) {
              console.log(result)
            } else if (result.responseCode == true ) {
              this.msgSubmitCreateUser = 'Sukses';
              document.getElementById('msgSubmitCreateUser').style.color = 'green';
              this.getPagePegawai()
            }
          },
          (err: HttpErrorResponse) => {
            this.apiService.gangguan(err)
          }
      )
    }
  }

}
