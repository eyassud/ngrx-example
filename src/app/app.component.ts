import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import * as AppActionTypes from './state/app.actions';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { AppSelectors } from './state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(AppSelectors.getTitle) title$: Observable<string>;

  constructor(private store: Store, private titleService: Title) { }

  ngOnInit(): void {
    const title = 'NGXS';
    this.store.dispatch(new AppActionTypes.LoggedIn(title, true));
    this.titleService.setTitle(`${title}`);
  }
}
