import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppActions } from './app.actions';
import { Observable } from 'rxjs';
import { AppState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngrx-example1';
  @Select(AppState.getAppName) appName$: Observable<string>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.SetName(this.title));
  }
}
