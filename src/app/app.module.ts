import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { EventModule } from './event/event.module';
import { SharedModule } from './shared.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode in production
      maxAge: 25 // Retains last 25 states
    }),
    EventModule
  ],
  providers: []
})
export class AppModule {}
