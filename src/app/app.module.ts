import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { SharedModule } from './shared.module';

// App
import { AppComponent } from './app.component';

// NgRx
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddEventFormComponent } from './add-event-form/add-event-form.component';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventListItemComponent } from './event-list-item/event-list-item.component';
import { EventListComponent } from './event-list/event-list.component';
import { eventReducer } from './event-store/event.reducer';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EventListComponent,
    EventListItemComponent,
    EventFilterComponent,
    AddEventFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({ event: eventReducer }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      maxAge: 25 // Retains last 25 states
    })
  ],
  providers: []
})
export class AppModule {}
