import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-update-profile-name',
  templateUrl: './dialog-update-profile-name.component.html',
  styleUrls: ['./dialog-update-profile-name.component.scss']
})
export class DialogUpdateProfileNameComponent implements OnInit {

  loading = false;
  public firstName;
  public lastName;
  currentUserId;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];

      this.firestore.collection('users').doc(this.currentUserId).valueChanges().subscribe((user: any) => {
        console.log(user);
        this.firstName = user.userInfos.firstName;
        this.lastName = user.userInfos.lastName;
      });
    });
  }
}
