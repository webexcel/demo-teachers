import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {Guard,loginGuard} from './_guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule),
    canActivate:[loginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
    canActivate:[Guard]
  },
  {
    path: 'circulars',
    loadChildren: () => import('./circulars/circulars.module').then( m => m.CircularsModule),
    canActivate:[Guard]
  },
  {
    path: 'homework',
    loadChildren: () => import('./homework/homework.module').then( m => m.HomeworkModule),
    canActivate:[Guard]
  },
  {
    path: 'language',
    loadChildren: () => import('./language/language.module').then( m => m.LanguageModule),
    canActivate:[Guard]
  },
  {
    path: 'personalized-messages',
    loadChildren: () => import('./personalized/personalized.module').then( m => m.PersonalizedModule),
    canActivate:[Guard]
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendanceModule),
    canActivate:[Guard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
