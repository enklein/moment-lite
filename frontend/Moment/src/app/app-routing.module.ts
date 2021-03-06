import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { UnAuthGuard } from './pages/auth/unauth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tasks' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule), canActivate:[UnAuthGuard] },
  { path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule), canActivate:[AuthGuard] },
  { path: 'activity', loadChildren: () => import('./pages/activity/activity.module').then(m => m.ActivityModule), canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
