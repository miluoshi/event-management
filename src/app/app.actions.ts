import { createAction, props } from '@ngrx/store';

// Event list
export const add = createAction('[Event list] Add event', props<{ name: string }>());

// Event filter toolbar
export const filterByName = createAction(
  '[Event filter] Filter events by name',
  props<{ text: string }>()
);
export const filterByDescription = createAction(
  '[Event filter] Filter events by description',
  props<{ text: string }>()
);
export const filterByLocation = createAction(
  '[Event filter] Filter events by location',
  props<{ text: string }>()
);
export const filterByAuthor = createAction(
  '[Event filter] Filter events by author',
  props<{ author: string }>()
);

// Event list item
export const remove = createAction('[Event list item] Remove event', props<{ id: string }>());
export const duplicate = createAction('[Event list item] Duplicate event', props<{ id: string }>());
export const openDetail = createAction('[Event list item] Open detail', props<{ id: string }>());
