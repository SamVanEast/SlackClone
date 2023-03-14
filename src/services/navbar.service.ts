import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
    showNavbarRight: boolean;
    showNavbarLeft: boolean;

  constructor() { this.showNavbarRight = false; }
  
  toggleRight() { this.showNavbarRight = !this.showNavbarRight }
  toggleLeft() { this.showNavbarLeft = !this.showNavbarLeft }
}