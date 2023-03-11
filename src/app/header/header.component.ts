import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public openNavbar = true;

  constructor(public elementRef: ElementRef) {

  }

  sub(): void {
  }

  
  openNavbarLeft() {
    this.openNavbar = !this.openNavbar
  }

  enteredSearchValue: string = '';
  
  
}

