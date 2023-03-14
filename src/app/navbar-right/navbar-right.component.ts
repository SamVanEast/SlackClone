import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogChangeImgComponent } from '../dialog-change-img/dialog-change-img.component';
import { DialogUpdateContactComponent } from '../dialog-update-contact/dialog-update-contact.component';
import { DialogUpdateProfileNameComponent } from '../dialog-update-profile-name/dialog-update-profile-name.component';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from 'src/services/user.service';


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

  constructor(public use: UserService, public nav: NavbarService, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

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
        const user: any = doc.data();
        this.profileImgSrc = user.userInfos.profileImg;
      });
    });
  }

  openDialog() {
    const dialog = this.dialog.open(DialogUpdateProfileNameComponent);
  }

  openDialogContact() {
    const dialogContact = this.dialog.open(DialogUpdateContactComponent);
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
