import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { SharingSessionPageRoutingModule } from './sharing-session-routing.module';

import { SharingSessionPage } from './sharing-session.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharingSessionPageRoutingModule,
    RouterModule.forChild([{ path: '', component: SharingSessionPage }])
  ],
  declarations: [SharingSessionPage]
})
export class SharingSessionPageModule {}
