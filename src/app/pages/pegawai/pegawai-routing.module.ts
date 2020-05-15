import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PegawaiPage } from './pegawai.page';

const routes: Routes = [
  {
    path: '',
    component: PegawaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PegawaiPageRoutingModule {}
