import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    RouterModule.forChild([{ path: '', component: ModalPage }])
  ],
  declarations: [ModalPage]
})
export class ModalPageModule {}