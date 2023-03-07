import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlackOverviewComponent } from './slack-overview/slack-overview.component';
import { HeaderComponent } from './header/header.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { MassagesHistoryComponent } from './massages-history/massages-history.component';
import { NavbarRightComponent } from './navbar-right/navbar-right.component';

@NgModule({
  declarations: [
    AppComponent,
    SlackOverviewComponent,
    HeaderComponent,
    NavbarLeftComponent,
    MassagesHistoryComponent,
    NavbarRightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
