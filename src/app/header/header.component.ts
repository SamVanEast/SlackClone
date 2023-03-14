import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  currentUserId;
  public profileImgSrc = '';
  openOrClose = false; 
  @Output() openNavbarLeft = new EventEmitter<any>();
  userId: string;
  public firstName;
  public lastName;
  public email;
  public phone;
  enteredSearchValue: string = '';
  public showNavbarRight = true;
  @Output() openNavbarRightEmit = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.currentUserId = params['id'];

      this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
        this.firstName = user.userInfos.firstName;
        this.lastName = user.userInfos.lastName;
        this.email = user.userInfos.email;
        this.phone = user.userInfos.phone;
      });

      this.firestore.collection('users').doc(this.currentUserId).get().subscribe((doc) => {
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
    this.openNavbarRightEmit.emit(this.showNavbarRight);
  }
}

