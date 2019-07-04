import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule
  ],
  imports: [CommonModule]
})
export class SharedModule {}
