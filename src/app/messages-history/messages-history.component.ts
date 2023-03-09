import { Component } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-messages-history',
  templateUrl: './messages-history.component.html',
  styleUrls: ['./messages-history.component.scss']
})
export class MessagesHistoryComponent {
  editor: Editor | undefined;
  html = '';

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  
}
