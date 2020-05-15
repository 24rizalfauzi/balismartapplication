import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharingSessionPage } from './sharing-session.page';

const routes: Routes = [
  {
    path: '',
    component: SharingSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharingSessionPageRoutingModule {}
