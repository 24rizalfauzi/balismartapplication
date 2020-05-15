import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'ide',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/ide/ide.module').then(m => m.IdePageModule)
          }
        ]
      },
      {
        path: 'sharing-session',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/sharing-session/sharing-session.module').then(m => m.SharingSessionPageModule)
          }
        ]
      },
      {
        path: 'ebook',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/ebook/ebook.module').then(m => m.EbookPageModule)
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/history/history.module').then(m => m.HistoryPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'forum-ide',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/forum-ide/forum-ide.module').then(m => m.ForumIdePageModule)
          }
        ]
      },
      {
        path: 'forum-sharing-session',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/forum-sharing-session/forum-sharing-session.module').then(m => m.ForumSharingSessionPageModule)
          }
        ]
      },
      {
        path: 'modal',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/modal/modal.module').then(m => m.ModalPageModule)
          }
        ]
      },
      {
        path: 'pegawai',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/pegawai/pegawai.module').then(m => m.PegawaiPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
