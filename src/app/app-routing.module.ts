import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { RoomPageComponent } from './pages/room-page/room-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [AuthGuard], },
  { path: 'room/:roomId', component: RoomPageComponent, canActivate: [AuthGuard], },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
