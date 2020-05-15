import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public ideas: any;
  public sharings: any;
  public user: any = JSON.parse(localStorage.getItem('user'));

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  	this.getPageHistoryIde()
  }

  getPageHistoryIde() {
    this.apiService.postData('getPageHistoryIde', {activeUserId:this.user.id, userId:this.user.id,userRole:this.user.role}).subscribe(
      (result: any) => {
        if (result.responseCode == true ) {
          this.ideas = result.ideas
          this.sharings = result.sharings
        }
      },
      (err: HttpErrorResponse) => {
        this.apiService.gangguan(err)
        console.log(err)
      }
    );
  }

  showIdeas(){
    document.getElementById('sharing').style.display = 'none';
    document.getElementById('ide').style.display = 'inline';
  }

  showSharings(){
    document.getElementById('sharing').style.display = 'inline';
    document.getElementById('ide').style.display = 'none';
  }

}
