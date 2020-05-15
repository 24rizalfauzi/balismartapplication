import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { EbookPageRoutingModule } from './ebook-routing.module';

import { EbookPage } from './ebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EbookPageRoutingModule,
    RouterModule.forChild([{ path: '', component: EbookPage }])
  ],
  declarations: [EbookPage]
})
export class EbookPageModule {}
