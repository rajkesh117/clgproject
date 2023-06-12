import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './model/landingpage/landingpage.component';
import { HomepageComponent } from './model/homepage/homepage.component';
import { DashboardComponent } from './model/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'HomepageComponent', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
