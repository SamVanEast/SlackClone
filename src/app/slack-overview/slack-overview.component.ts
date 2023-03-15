import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mobile } from 'src/services/mobile.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})

export class SlackOverviewComponent {
  whichContentShouldLoad;
  innerWidth: any;

  constructor(public use: UserService, private route: ActivatedRoute, public mobile: Mobile) {
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
      this.mobile.mobileNavBar = true;
      this.mobile.mobileContent = true;
      this.mobile.navBarRight = true;
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
    this.mobile.closeAll();
    this.mobile.mobileNavBar = true;
  }


  /**
   * open the chat area
   */
  showMessages() {
    this.mobile.closeAll();
    this.mobile.mobileContent = true;
  }
}
