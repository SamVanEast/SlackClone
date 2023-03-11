import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  constructor() { }

  private searchText = new BehaviorSubject<string>('');

  setSearchText(text: string) {
    this.searchText.next(text);
  }

  getSearchText() {
    return this.searchText.asObservable();
  }


}
