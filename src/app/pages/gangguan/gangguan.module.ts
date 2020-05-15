import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GangguanPageRoutingModule } from './gangguan-routing.module';

import { GangguanPage } from './gangguan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GangguanPageRoutingModule
  ],
  declarations: [GangguanPage]
})
export class GangguanPageModule {}
