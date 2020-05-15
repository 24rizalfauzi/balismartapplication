import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PegawaiPageRoutingModule } from './pegawai-routing.module';

import { PegawaiPage } from './pegawai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PegawaiPageRoutingModule
  ],
  declarations: [PegawaiPage]
})
export class PegawaiPageModule {}
