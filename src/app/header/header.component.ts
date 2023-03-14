import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  openOrClose = false; 
  @Output() openNavbarLeft = new EventEmitter<any>();
  userId: string;
  public firstName;
  public lastName;
  public email;
  public phone;
  enteredSearchValue: string = '';

  constructor(public use: UserService, public nav: NavbarService, private route: ActivatedRoute, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.use.currentUserId = params['id'];

      this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
        this.firstName = user.userInfos.firstName;
        this.lastName = user.userInfos.lastName;
        this.email = user.userInfos.email;
        this.phone = user.userInfos.phone;
      });

      this.firestore.collection('users').doc(this.use.currentUserId).get().subscribe((doc) => {
        const user:any = doc.data();
        this.profileImgSrc = user.userInfos.profileImg;
      });
    });

    this.openOrCloseNavbarLeft();
  }

  sub(): void {
  }


  openOrCloseNavbarLeft() {
    this.openOrClose = !this.openOrClose
    this.openNavbarLeft.emit(this.openOrClose);
  }


  openImprint() {
    this.dialog.open(ImprintDataprotectionComponent);
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue); 
  }

  openNavbarRight() {
    this.nav.toggle();
  }
}

