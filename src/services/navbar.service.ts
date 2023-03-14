import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  showNavbarRight: boolean;
  showNavbarLeft: boolean;

  constructor() { this.showNavbarRight = false; this.showNavbarLeft = true }

  openRight() { this.showNavbarRight = true }
  toggleRight() { this.showNavbarRight = !this.showNavbarRight }
  toggleLeft() { this.showNavbarLeft = !this.showNavbarLeft }
}