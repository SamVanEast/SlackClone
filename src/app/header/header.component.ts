import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  public profileImgSrc = '';
  enteredSearchValue: string = '';
  @Output() searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(public use: UserService, public nav: NavbarService, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog) { }

  /**
   * load user information 
   */
  ngOnInit(): void {
    this.firestore.collection('users').doc(this.use.currentUserId).get().subscribe((doc) => {
      const user: any = doc.data();
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
  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
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
    this.nav.toggleRight();
    this.nav.whichProfileShouldLoad.next(this.use.currentUserId);
  }
}

