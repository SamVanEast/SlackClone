import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NavbarService {
  showNavbarRight: boolean;
  showNavbarLeft: boolean;
  whichProfileShouldLoad = new Subject<any>();
  autoScroll: boolean;

  constructor() { this.showNavbarRight = false; this.showNavbarLeft = true }

  openRight() { this.showNavbarRight = true }
  toggleRight() { this.showNavbarRight = !this.showNavbarRight }
  toggleLeft() { this.showNavbarLeft = !this.showNavbarLeft }

  autoScrollOn() {
    this.autoScroll = true;
    setTimeout(() => {
      this.autoScroll = false;
    }, 300);
  }
}