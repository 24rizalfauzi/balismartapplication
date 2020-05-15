import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ForumSharingSessionPageRoutingModule } from './forum-sharing-session-routing.module';

import { ForumSharingSessionPage } from './forum-sharing-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumSharingSessionPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ForumSharingSessionPage }])
  ],
  declarations: [ForumSharingSessionPage]
})
export class ForumSharingSessionPageModule {}
