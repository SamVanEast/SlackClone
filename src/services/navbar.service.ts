import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
    showNavbarRight: boolean;

  constructor() { this.showNavbarRight = false; }
  
  toggle() { this.showNavbarRight = !this.showNavbarRight; }
}