import { createAction, props } from '@ngrx/store';

// Event list
export const add = createAction('[Event list] Add event', props<{ name: string }>());

// Event filter toolbar
export const filterByText = createAction(
  '[Event filter] Filter events by name/description/location',
  props<{ text: string }>()
);
export const filterByAuthor = createAction(
  '[Event filter] Filter events by author',
  props<{ authors: string[] }>()
);

// Event list item
export const remove = createAction('[Event list item] Remove event', props<{ id: number }>());
export const duplicate = createAction('[Event list item] Duplicate event', props<{ id: number }>());
export const openDetail = createAction('[Event list item] Open detail', props<{ id: number }>());
