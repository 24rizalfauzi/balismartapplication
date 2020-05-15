import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-ebook',
  templateUrl: './ebook.page.html',
  styleUrls: ['./ebook.page.scss'],
})
export class EbookPage implements OnInit {

  public msgAttachment: any = "";
  public msgUploadEbook: any = "";
  public stlMsgUploadEbook: any;
  public ebooks: any;
  public showEbooks: any;
  public user: any = JSON.parse(localStorage.getItem('user'))
  public settings: any = JSON.parse(localStorage.getItem('settings'))
  public folderEbook: any
  public folder: any = undefined
  public attachments: File[];

  constructor(private http: HttpClient, private apiService: ApiService, public config: ConfigService) { }

  ngOnInit() {
    this.folderEbook = this.settings.folder_ebook.split(",")
  	this.getPageEbook()
  }

  getPageEbook() {
  	this.apiService.postData('getPageEbook', {activeUserId:this.user.id}).subscribe(
      (result: any) => {
        if (result.responseCode == true ) {
          this.ebooks = result.ebooks
          console.log(result.ebooks)
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        this.apiService.gangguan(err)
      }
    );
  }

  downloadAttachment(ebookName){
    (<any>window).open(this.config.serverUrl+`/api/downloadEbook/` + ebookName, '_self');
  }

  uploadEbook(form: NgForm){
    console.log(this.attachments)
    console.log(this.folder)
    var validForm = true
    if (this.folder==undefined) {
      this.msgUploadEbook = '<br>Folder harus dipilih'
      document.getElementById('stlMsgUploadEbook').style.color = 'red';
      validForm = false
    }
    if (this.attachments==undefined) {
      this.msgUploadEbook = this.msgUploadEbook+'<br>Ebook harus di attach'
      document.getElementById('stlMsgUploadEbook').style.color = 'red';
      validForm = false
    }
    if (validForm) {
      const inputData = new FormData()
      const files: Array<File> = this.attachments;
      if(files==undefined){
          inputData.append("attachments", undefined); 
      } else {
        for(let i =0; i < files.length; i++){
            inputData.append("attachments", files[i], files[i]['name']);
        }
      }
      inputData.append("activeUserId", this.user.id);
      inputData.append("uploaderId", this.user.id);
      inputData.append("folder", this.folder);
      this.apiService.postData('uploadEbook', inputData).subscribe(
        (result: any) => {
            console.log(result);
            if (result.responseCode == false ) {
              this.msgUploadEbook = result.responseMessage
              document.getElementById('stlMsgUploadEbook').style.color = 'red';
            } else if (result.responseCode == true ) {
              this.attachments = undefined
              this.folder = undefined
              this.msgAttachment = ''
              this.msgUploadEbook = result.responseMessage;
              document.getElementById('stlMsgUploadEbook').style.color = 'green';
              this.getPageEbook()
            }
        },
        (err: HttpErrorResponse) => {
            console.log(err)
            this.apiService.gangguan(err)
        }
      );
    }
  }

  onChangeAttachments(attachments) {
    this.attachments = attachments.target.files;
    this.msgAttachment = attachments.target.files.length + " file" ;
  }

  onChangeFolderList(folderName) {
    this.showEbooks = this.ebooks[folderName]
  }

}
