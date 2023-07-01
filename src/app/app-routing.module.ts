import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './model/homepage/homepage.component';
import { DashboardComponent } from './model/dashboard/dashboard.component';
import { LoginPageComponent } from './model/login-page/login-page.component';
import { ShowBusComponent } from './model/show-bus/show-bus.component';
import { AuthGuard } from './services/authguard.service';
import { AuthService } from './services/authService';
import { AddTripComponent } from './model/admin-page/add-trip/add-trip.component';
import { BookBusComponent } from './model/book-bus/book-bus.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'HomepageComponent', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'ShowBusComponent', component: ShowBusComponent, canActivate: [AuthGuard] },
  { path: 'addtrip', component: AddTripComponent, canActivate: [AuthGuard] },
  { path: 'bookticket', component: BookBusComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
