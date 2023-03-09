import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-update-contact',
  templateUrl: './dialog-update-contact.component.html',
  styleUrls: ['./dialog-update-contact.component.scss']
})
export class DialogUpdateContactComponent {

  loading = false;
  public email;
  public phone;
  currentUserId;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngAfterViewInit(): void {
    this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
      console.log(user);
      this.email = user.userInfos.email;
      this.phone = user.userInfos.phone;
    });
  }
}
