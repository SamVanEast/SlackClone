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
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTreeModule} from '@angular/material/tree'; 

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
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTreeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
