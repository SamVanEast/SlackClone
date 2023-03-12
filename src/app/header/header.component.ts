import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ImprintDataprotectionComponent } from '../imprint-dataprotection/imprint-dataprotection.component';
import { NavbarRightComponent } from '../navbar-right/navbar-right.component';
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

  constructor(private route: ActivatedRoute, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog, private navbarRight: NavbarRightComponent) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.currentUserId = params['id'];

      this.firestore.collection('users').doc(this.currentUserId).get().subscribe((doc) => {
        this.profileImgSrc = doc.get('userInfos.profileImage');
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


  openRightNavbar(){
    console.log('works');
    this.navbarRight.open();
  }

}

