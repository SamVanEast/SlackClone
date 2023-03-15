import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {
  currentUserId;
  whichContentShouldLoad = new Subject<any>();
  constructor() {}
}