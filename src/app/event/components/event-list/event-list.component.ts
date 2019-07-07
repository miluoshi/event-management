import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { duplicate, remove } from '../../store/event.actions';
import * as fromEvent from '../../store/event.reducer';
import { getGroupedFilteredEvents, GroupedEvents } from '../../store/event.selectors';

@Component({
  selector: 'app-event-list',
  styleUrls: ['./event-list.component.scss'],
  templateUrl: './event-list.html'
})
export class EventListComponent implements OnInit {
  pastEvents$: Observable<fromEvent.Event[] | undefined>;
  currentEvents$: Observable<fromEvent.Event[] | undefined>;
  futureEvents$: Observable<fromEvent.Event[] | undefined>;

  constructor(private store: Store<{ event: fromEvent.EventsState }>) {
    const events$ = this.store.pipe(select(getGroupedFilteredEvents));

    this.pastEvents$ = this.getEventGroupStream('past', events$);
    this.currentEvents$ = this.getEventGroupStream('current', events$);
    this.futureEvents$ = this.getEventGroupStream('future', events$);
  }

  /**
   * Pipes specific time group of events out of all grouped events.
   * Maps empty list to `undefined` to enable "*ngIf as" syntax with async pipe.
   */
  private getEventGroupStream(groupKey: keyof GroupedEvents, events$: Observable<GroupedEvents>) {
    return events$.pipe(
      map((group) => group[groupKey]),
      map((events) => (events.length > 0 ? events : undefined))
    );
  }

  onDuplicate(id: number) {
    this.store.dispatch(duplicate({ id }));
  }

  onRemove(id: number) {
    this.store.dispatch(remove({ id }));
  }

  ngOnInit() {}
}
