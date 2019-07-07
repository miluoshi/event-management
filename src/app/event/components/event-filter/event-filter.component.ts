import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { filterByAuthor, filterByText } from '../../store/event.actions';
import * as fromEvent from '../../store/event.reducer';
import { getAllAuthors, getAuthorFilter } from '../../store/event.selectors';

@Component({
  selector: 'app-event-filter',
  styleUrls: ['./event-filter.component.scss'],
  templateUrl: './event-filter.component.html'
})
export class EventFilterComponent implements OnInit, OnDestroy {
  textFilterFormControl = new FormControl('');
  authorFilterFormControl = new FormControl([]);
  private authorFilterSubscription: Subscription;

  // List of author ids used for author filter dropdown options
  allEventAuthors$: Observable<string[]>;

  constructor(private store: Store<{ event: fromEvent.EventsState }>) {
    this.allEventAuthors$ = this.store.pipe(select(getAllAuthors));
  }

  ngOnInit() {
    // Set initial value of `authorFilter` - all authors are selected by default.
    this.allEventAuthors$.pipe(take(1)).subscribe((authors) => {
      this.authorFilterFormControl.setValue(authors);
    });

    // Subscribe to changes in `authorFilter` from store and update the FormControl
    this.authorFilterSubscription = this.store
      .pipe(select(getAuthorFilter))
      .subscribe((authors) => {
        this.authorFilterFormControl.setValue(authors);
      });

    // Dispatch `filterByText` action when filter value changes
    this.textFilterFormControl.valueChanges.subscribe((text) => {
      this.store.dispatch(filterByText({ text }));
    });
    // Displatch `filterByAuthor` action when author filter value changes
    this.authorFilterFormControl.valueChanges.subscribe((authors) => {
      this.store.dispatch(filterByAuthor({ authors }));
    });
  }

  ngOnDestroy() {
    // Unsubscribe from authorFilter value changes
    this.authorFilterSubscription.unsubscribe();
  }
}
