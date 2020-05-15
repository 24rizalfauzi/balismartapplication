import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'gangguan',
    loadChildren: () => import('./pages/gangguan/gangguan.module').then( m => m.GangguanPageModule)
  },
  {
    path: 'ide',
    loadChildren: () => import('./pages/ide/ide.module').then( m => m.IdePageModule)
  },
  {
    path: 'sharing-session',
    loadChildren: () => import('./pages/sharing-session/sharing-session.module').then( m => m.SharingSessionPageModule)
  },
  {
    path: 'ebook',
    loadChildren: () => import('./pages/ebook/ebook.module').then( m => m.EbookPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'forum-ide',
    loadChildren: () => import('./pages/forum-ide/forum-ide.module').then( m => m.ForumIdePageModule)
  },
  {
    path: 'forum-sharing-session',
    loadChildren: () => import('./pages/forum-sharing-session/forum-sharing-session.module').then( m => m.ForumSharingSessionPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'pegawai',
    loadChildren: () => import('./pages/pegawai/pegawai.module').then( m => m.PegawaiPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
