import { Component, ElementRef, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';
import { SearchBarService } from 'src/services/searchBar.service';
import { Mobile } from 'src/services/mobile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public profileImgSrc = '';
  enteredSearchValue: string = '';
  isMobile = false;

  constructor(public search: SearchBarService, public use: UserService, public nav: NavbarService, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog, private mobile: Mobile) {
    if (window.innerWidth <= 620) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }


  @HostListener('window:resize', ['$event'])


  /**
   * detects if you are in mobile mode
   */
  onResize(event) {
    if (window.innerWidth <= 620) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }



  /**
   * load user information 
   */
  ngOnInit(): void {
    this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
      this.profileImgSrc = user.userInfos.profileImg;
    });
  }


  /**
   *  
   *open dialog
   */
  openImprint() {
    this.dialog.open(ImprintDataprotectionComponent);
  }


  /**
   * ouput search text
   */
  onSearchTextChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.search.enteredSearchValue = inputElement.value;
    this.nav.autoScroll = true;
    setTimeout(() => {
      this.nav.autoScroll = false;
    }, 300);
  }


  /**
   * open or close navbar left
   */
  toggleNavbarLeft() {
    this.nav.toggleLeft();
  }


  /**
   * open or close navbar right and whisch profile should load
   */
  openNavbarRight() {
    if (this.isMobile) {
      this.mobile.closeAll();
      this.mobile.navBarRight = true;
    }
    this.nav.toggleRight();
    this.nav.whichProfileShouldLoad.next(this.use.currentUserId);
  }
}

