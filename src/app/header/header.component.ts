import { Component, ElementRef } from '@angular/core';
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
  public openNavbar = true;
  currentUserId;
  public profileImgSrc = '';

  constructor(private route: ActivatedRoute, public elementRef: ElementRef, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {

      this.currentUserId = params['id'];

      this.firestore.collection('users').doc(this.currentUserId).get().subscribe((doc) => {
        this.profileImgSrc = doc.get('userInfos.profileImage');
        console.log(this.profileImgSrc);
      });
    });
  }

  sub(): void {
  }


  openNavbarLeft() {
    this.openNavbar = !this.openNavbar
  }


  openImprint() {
    this.dialog.open(ImprintDataprotectionComponent);
  }

}

