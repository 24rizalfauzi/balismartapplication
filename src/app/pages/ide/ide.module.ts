import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { IdePageRoutingModule } from './ide-routing.module';

import { IdePage } from './ide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdePageRoutingModule,
    RouterModule.forChild([{ path: '', component: IdePage }])
  ],
  declarations: [IdePage]
})
export class IdePageModule {}
