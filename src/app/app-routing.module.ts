import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SlackOverviewComponent } from './slack-overview/slack-overview.component';

const routes: Routes = [
  {path: '', component:  SlackOverviewComponent},
  {path: ':id', component:  SlackOverviewComponent},
  {path: 'slack/login', component:  LoginComponent},
  {path: 'slack/overview', component:  SlackOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
