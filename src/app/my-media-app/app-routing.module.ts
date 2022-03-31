import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/auth/guards/auth-guard.service';
import { Oauth2Guard } from '../core/auth/guards/oauth2.guard';
import { HomeComponent } from '../features/home/component/home.component';
import { LoginComponent } from '../features/login/component/login.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'access_token',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivateChild: [Oauth2Guard],
  },
  {
    path: 'id_token',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivateChild: [Oauth2Guard],
  },
  {
    path: 'error',
    pathMatch: 'full',
    component: LoginComponent,
    canActivate: [Oauth2Guard],
  },
  //#endregion OAUTH2
  {
    path: 'home', 
    canActivate: [AuthGuardService], 
    loadChildren: () => import('../features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'film', 
    canActivate: [AuthGuardService], 
    loadChildren: () => import('../features/film/film.module').then((m) => m.FilmModule)
  },
  {
    path: 'music', 
    canActivate: [AuthGuardService], 
    loadChildren: () => import('../features/music/music.module').then((m) => m.MusicModule)
  },
  {
    path: 'book', 
    canActivate: [AuthGuardService], 
    loadChildren: () => import('../features/book/book.module').then((m) => m.BookModule)
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
