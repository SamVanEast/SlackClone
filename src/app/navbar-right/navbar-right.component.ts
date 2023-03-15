import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogChangeImgComponent } from '../dialog-change-img/dialog-change-img.component';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';
import { DialogUpdateProfileNameComponent } from '../dialog-update-profile-name/dialog-update-profile-name.component';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.scss']
})
export class NavbarRightComponent {
  public profileImgSrc = '';
  userId: string;
  public firstName;
  public lastName;
  public email;
  public phone;
  enteredSearchValue: string = '';
  // private myVariableSubject = new Subject<string>();

  constructor(public use: UserService, public nav: NavbarService, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.nav.whichProfileShouldLoad.subscribe((id) => {
      console.log('funktioniert', id);


      if (id == this.use.currentUserId) {
        this.firestore.collection('users').doc(id).valueChanges(id).subscribe((user: any) => {
          this.firstName = user.userInfos.firstName;
          this.lastName = user.userInfos.lastName;
          this.email = user.userInfos.email;
          this.phone = user.userInfos.phone;
          this.profileImgSrc = user.userInfos.profileImg;
        });
      }else {

      }
    })
    // }else {

    //   this.firestore.collection('users').doc(this.use.currentUserId).valueChanges().subscribe((user: any) => {
    //     this.firstName = user.userInfos.firstName;
    //     this.lastName = user.userInfos.lastName;
    //     this.email = user.userInfos.email;
    //     this.phone = user.userInfos.phone;
    //     this.profileImgSrc = user.userInfos.profileImg;
    //   });
    // }
  }

  openDialog() {
    this.dialog.open(DialogUpdateProfileNameComponent);
  }

  openDialogContact() {
    this.dialog.open(DialogUpdateContactComponent);
  }

  openDialogChangeImg() {
    const dialogImage = this.dialog.open(DialogChangeImgComponent);

    dialogImage.afterClosed().subscribe(result => {
      if (result) {
        this.profileImgSrc = `../../${result}`;

        this.firestore.collection('users').doc(this.use.currentUserId).update({
          'userInfos.profileImg': this.profileImgSrc,
        })
      }
    });
  }

  closeNavbarRight() {
    this.nav.toggleRight();
  }
}
