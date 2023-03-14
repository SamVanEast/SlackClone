import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from 'src/models/channels';
import { group } from 'src/models/group';
import { directMessage } from 'src/models/directMessage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})

export class SlackOverviewComponent {
  @ViewChild('header') header;
  @ViewChild('messagsHistory') messagsHistory;
  currentUserId;
  whichContentShouldLoad;
  searchText: string = '';
  mobileNavBar = true;
  mobileContent = true;
  innerWidth: any;

  constructor(private router: Router, private firestore: AngularFirestore, private route: ActivatedRoute,) {

    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
    });

    this.firestore.collection('users').valueChanges({ idField: 'docId' }).subscribe((changes: any) => {
      // console.log(changes);
    })

    // this.firestore.collection('users').doc(this.currentUserId).update(user).then((user) => {
    // })


    // this.generateChannelDoc();
    // this.generateGoupsDoc();
    // this.generateDirectMessageDoc();
    // this.generateUserDoc();
  }  

    // scripts
  
  @HostListener('window:resize', ['$event'])
    onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth >= 620) {
      this.mobileNavBar = true;
      this.mobileContent = true
    }
  }

  // ngOnInit() {
  //   this.scrollToBottom();
  // }

  // scrollToBottom(){
  //   this.messagsHistory.nativeElement.scrollTop = this.messagsHistory.nativeElement.scrollHeight;
  // }

  setContent(whichContentShouldLoad) {
    this.whichContentShouldLoad = whichContentShouldLoad;
  }

  openOrClose(boolean) {
    // if (boolean) {
    //   document.getElementById('sidenav-left').classList.remove('closeNavbar');

    // } else {
    //   document.getElementById('sidenav-left').classList.add('closeNavbar');
    // }
  }

  generateChannelDoc() {
    this.firestore.collection('channels').add(channels).then((user) => {
    })
  }
  generateUserDoc() {
    this.firestore.collection('users').add(user).then((user) => {
    })
  }
  generateGoupsDoc() {
    this.firestore.collection('groups').add(group).then((user) => {
    })
  }
  generateDirectMessageDoc() {
    this.firestore.collection('directMessages').add(directMessage).then((user) => {
    })
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  showChannels() {
    this.mobileNavBar = true;
    this.mobileContent = false;
  }

  showMessages() {
    this.mobileNavBar = false;
    this.mobileContent = true;
  }
}
