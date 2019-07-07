import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared.module';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { EventDetailDialogComponent } from './components/event-detail-dialog/event-detail-dialog.component';
import { EventFilterComponent } from './components/event-filter/event-filter.component';
import { EventListItemComponent } from './components/event-list-item/event-list-item.component';
import { EventListViewComponent } from './components/event-list-view/event-list-view.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { eventReducer } from './store/event.reducer';

@NgModule({
  declarations: [
    EventListViewComponent,
    EventListComponent,
    EventListItemComponent,
    EventFilterComponent,
    AddEventDialogComponent,
    EventDetailDialogComponent
  ],
  // Components opened in dialog are not added to initial compilation automatically, thus they need to be defined here.
  entryComponents: [EventDetailDialogComponent, AddEventDialogComponent],
  exports: [EventListViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('event', eventReducer)
  ]
})
export class EventModule {}
