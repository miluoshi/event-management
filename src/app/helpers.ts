import * as faker from 'faker';
import { Event, EventMap } from './event-store/event.reducer';

export const currentUser = 'demo';

export function normalizeEventsData(events: Event[]): EventMap {
  // It's defined beforehand to prevent TSlint error no-object-literal-type-assertion
  const defaultEventMap: EventMap = {};

  return events.reduce(
    (eventMap, event) => ({
      ...eventMap,
      [event.id]: event
    }),
    defaultEventMap
  );
}

/**
 * Generates an event with given `id` and `name` created by current user
 * starting from now and ending in 2 hours.
 */
export function generateEvent(id: number, name: string): Event {
  // Decide with equal probability whether event will be past/current/future
  const timeBox = (['past', 'current', 'future'] as const)[Math.floor(Math.random() * 3)];
  const { timeStart, timeEnd } = getRandomEventDates(timeBox);

  // Randomly generate user ("demo" or random name)
  const author = ['demo', faker.internet.userName()][Math.round(Math.random())];

  return {
    author,
    description: faker.lorem.paragraphs(2),
    id,
    location: faker.address.city(),
    name,
    timeEnd,
    timeStart
  };
}

function getRandomEventDates(timeBox: 'past' | 'current' | 'future') {
  const randomEventDurationDays = faker.random.number({ min: 0, max: 10 });

  let timeStart: Date;
  let timeEnd: Date;
  switch (timeBox) {
    case 'past':
      timeStart = faker.date.recent(randomEventDurationDays);
      timeEnd = faker.date.between(timeStart, new Date());
      break;
    case 'current':
      timeStart = faker.date.recent(randomEventDurationDays);
      timeEnd = faker.date.soon(randomEventDurationDays);
      break;
    case 'future':
      timeEnd = faker.date.soon(randomEventDurationDays);
      timeStart = faker.date.between(new Date(), timeEnd);
  }
  return { timeStart, timeEnd };
}

/** Returns array of unique author ids from all events */
export function getUniqueAuthors(events: Event[]) {
  const authors = events.map((e) => e.author);

  return Array.from(new Set(authors));
}
