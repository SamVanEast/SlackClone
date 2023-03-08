import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlackOverviewComponent } from './slack-overview/slack-overview.component';
import { HeaderComponent } from './header/header.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import { MassagesHistoryComponent } from './massages-history/massages-history.component';
import { NavbarRightComponent } from './navbar-right/navbar-right.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
