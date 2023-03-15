import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { user } from 'src/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { channels } from 'src/models/channels';
import { group } from 'src/models/group';
import { directMessage } from 'src/models/directMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})

export class SlackOverviewComponent {
  whichContentShouldLoad;
  searchText: string = '';
  mobileNavBar = true;
  mobileContent = true;
  navBarRight = true;
  innerWidth: any;

  constructor(public use: UserService, private router: Router, private firestore: AngularFirestore, private route: ActivatedRoute,) {
    this.route.params.subscribe((params) => {
      this.use.currentUserId= params['id'];
    });
  }  
  
  @HostListener('window:resize', ['$event'])

  /**
   * detects if you are in mobile mode
   */
    onResize(event) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth >= 620) {
      this.mobileNavBar = true;
      this.mobileContent = true;
      this.navBarRight = true;
    }
  }

  /**
   * stores output variable
   * @param whichContentShouldLoad collection name, doc id and headline name
   */
  setContent(whichContentShouldLoad) {
    this.whichContentShouldLoad = whichContentShouldLoad;
  }

/**
 * stores output variable
 * @param searchValue what to look for
 */
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  /**
   * open the communication area
   */
  showChannels() {
    this.mobileNavBar = true;
    this.mobileContent = false;
  }

  /**
   * open the chat area
   */
  showMessages() {
    this.mobileNavBar = false;
    this.mobileContent = true;
  }
}
