import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateProfileNameComponent } from '../dialog-update-profile-name/dialog-update-profile-name.component';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';
import { DialogChangeImgComponent } from '../dialog-change-img/dialog-change-img.component';

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
  showNavbarRight = false;
  userId: string;
  public firstName;
  public lastName;
  public email;
  public phone;
  enteredSearchValue: string = '';


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
        console.log(this.profileImgSrc);
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

  openDialog() {
    const dialog = this.dialog.open(DialogUpdateProfileNameComponent);
    dialog.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogContact() {
    const dialogContact = this.dialog.open(DialogUpdateContactComponent);
    dialogContact.componentInstance.currentUserId = this.currentUserId;
  }

  openDialogChangeImg(){
    const dialogImage= this.dialog.open(DialogChangeImgComponent);
    dialogImage.componentInstance.currentUserId = this.currentUserId;

    dialogImage.afterClosed().subscribe(result => {
      if(result){
        this.profileImgSrc = `../../${result}`;

        this.firestore.collection('users').doc(this.currentUserId).update({
          'userInfos.profileImage': this.profileImgSrc,
        })
      }
    });
  }

  openRightNavbar(){
    this.showNavbarRight = true;
    
  }

  closeNavbarRight() {
    this.showNavbarRight = false;
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue); 
  }

}

