import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { InterfazAdminComponent } from './components/interfaz-admin/interfaz-admin.component';
import { InterfazUserComponent } from './components/interfaz-user/interfaz-user.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'interfaz-user', component: InterfazUserComponent, canActivate: [UserGuard] },
  { path: 'interfaz-admin', component: InterfazAdminComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
