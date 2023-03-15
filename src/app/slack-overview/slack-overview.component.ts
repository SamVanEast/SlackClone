import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})

export class SlackOverviewComponent {
  whichContentShouldLoad;
  mobileNavBar = true;
  mobileContent = true;
  navBarRight = true;
  innerWidth: any;

  constructor(public use: UserService, private route: ActivatedRoute,) {
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
