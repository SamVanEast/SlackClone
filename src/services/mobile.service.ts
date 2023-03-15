import { Injectable } from '@angular/core';

@Injectable()
export class Mobile {
    mobileNavBar = true;
    mobileContent = true;
    navBarRight = true;

    constructor() { }

    closeAll() {
        this.mobileNavBar = false;
        this.mobileContent = false;
        this.navBarRight = false;
    }
}