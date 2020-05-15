import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumIdePage } from './forum-ide.page';

const routes: Routes = [
  {
    path: '',
    component: ForumIdePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumIdePageRoutingModule {}
