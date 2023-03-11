import { Component, ElementRef } from '@angular/core';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public openNavbar = true;

  constructor(public elementRef: ElementRef, public dialog: MatDialog) {

  }

  sub(): void {
  }

  
  openNavbarLeft() {
    this.openNavbar = !this.openNavbar
  }


  openImprint() {
    this.dialog.open(ImprintDataprotectionComponent);
  }

}

