import { Component } from '@angular/core';
import { user } from 'src/models/user';

@Component({
  selector: 'app-slack-overview',
  templateUrl: './slack-overview.component.html',
  styleUrls: ['./slack-overview.component.scss']
})
export class SlackOverviewComponent {;
  constructor() { 
    // console.log(Object.keys(this.user.user.userInfos).length);
    console.log(user);
  }
}
