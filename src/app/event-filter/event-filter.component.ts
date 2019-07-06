import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { filterByAuthor, filterByText } from '../event-store/event.actions';
import * as fromEvent from '../event-store/event.reducer';
import { getAllAuthors } from '../event-store/event.selectors';

@Component({
  selector: 'app-event-filter',
  styleUrls: ['./event-filter.component.scss'],
  templateUrl: './event-filter.component.html'
})
export class EventFilterComponent implements OnInit {
  textFilter = new FormControl('');
  authorFilter = new FormControl([]);

  // List of author ids used for author filter dropdown options
  allEventAuthors$: Observable<string[]>;

  constructor(private store: Store<{ event: fromEvent.EventsState }>) {
    this.allEventAuthors$ = this.store.pipe(select(getAllAuthors));
  }

  ngOnInit() {
    // Set initial value of `authorFilter` - all authors are selected by default.
    this.allEventAuthors$.pipe(take(1)).subscribe((authors) => {
      this.authorFilter.setValue(authors);
    });

    // Dispatch filterByText action when filter value changes
    this.textFilter.valueChanges.subscribe((text) => {
      this.store.dispatch(filterByText({ text }));
    });

    this.authorFilter.valueChanges.subscribe((authors) => {
      this.store.dispatch(filterByAuthor({ authors }));
    });
  }
}
