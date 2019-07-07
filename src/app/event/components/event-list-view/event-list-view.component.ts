import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { AddEventDialogComponent } from 'src/app/event/components/add-event-dialog/add-event-dialog.component';
import { add } from '../../store/event.actions';
import { EventsState } from '../../store/event.reducer';

@Component({
  selector: 'app-event-list-view',
  styleUrls: ['./event-list-view.component.scss'],
  templateUrl: './event-list-view.component.html'
})
export class EventListViewComponent {
  constructor(private store: Store<EventsState>, private dialog: MatDialog) {}

  onAddEvent(eventName: string) {
    this.store.dispatch(add({ name: eventName }));
  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(AddEventDialogComponent, { width: '600px' });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((eventName: string | undefined) => {
        if (eventName) {
          this.store.dispatch(add({ name: eventName }));
        }
      });
  }
}
