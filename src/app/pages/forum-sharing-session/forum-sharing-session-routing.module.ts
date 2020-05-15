import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumSharingSessionPage } from './forum-sharing-session.page';

const routes: Routes = [
  {
    path: '',
    component: ForumSharingSessionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumSharingSessionPageRoutingModule {}
