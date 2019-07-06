import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { filterByText } from '../app.actions';
import * as fromEvent from '../app.reducer';

@Component({
  selector: 'app-event-filter',
  styleUrls: ['./event-filter.component.scss'],
  templateUrl: './event-filter.component.html'
})
export class EventFilterComponent implements OnInit {
  textFilter = new FormControl('');

  constructor(private store: Store<{ event: fromEvent.EventsState }>) {}

  ngOnInit() {
    // Dispatch filterByText action when filter value changes
    this.textFilter.valueChanges.pipe(distinctUntilChanged()).subscribe((text) => {
      this.store.dispatch(filterByText({ text }));
    });
  }
}
