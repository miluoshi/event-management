import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromEvent from '../app.reducer';

@Component({
  selector: 'app-event-list',
  styleUrls: ['./event-list.component.scss'],
  templateUrl: './event-list.html'
})
export class EventListComponent implements OnInit {
  events$: Observable<fromEvent.GroupedEvents>;

  constructor(private store: Store<{ event: fromEvent.EventsState }>) {
    this.events$ = this.store.pipe(select(fromEvent.getGroupedEvents));
  }

  ngOnInit() {}
}
