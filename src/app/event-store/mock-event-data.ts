import { Event } from './event.reducer';

export const mockEvents: Event[] = [
  {
    author: 'holyspirit',
    description: '93. plenárne zasadanie Konferencie biskupov Slovenska na Spišskej Kapitule.',
    id: 0,
    location: 'Spišská Kapitula',
    name: 'Konferencia biskupov Slovenska',
    timeEnd: new Date(2019, 5, 18, 15),
    timeStart: new Date(2019, 5, 17, 9)
  },
  {
    author: 'demo',
    description: `Romantická atmosféra botanickej záhrady a tóny majstrov našej hudobnej scény
      pozývajú na jedinečný a neopakovateľný zážitok.
      Organizuje Hudobný klub Kamel v spolupráci s Botanickou záhradou UK a BKIS.`,
    id: 1,
    location: 'Bratislava',
    name: 'Komorné koncerty v botanickej záhrade',
    timeEnd: new Date(2019, 6, 20, 17, 30),
    timeStart: new Date(2019, 6, 20, 18, 30)
  },
  {
    author: 'demo',
    description: 'Deviaty ročník pestrofarebného festivalu Dúhový PRIDE Bratislava',
    id: 2,
    location: 'Bratislava',
    name: 'Dúhový PRIDE Bratislava 2019',
    timeEnd: new Date(2019, 6, 20, 15, 0),
    timeStart: new Date(2019, 6, 20, 20, 0)
  },
  {
    author: 'Dodi',
    description: `Posledný koncert U2 sa menežéri v spolupráci s našou stranou rozhodli usporiadať vo Fekišovciach.
      Bono zaspieva na začiatok štátnu hymnu. Aj druhú slohu.
      Pani starostka bude koncert moderovať a Ďodi už pracuje na on-line rezerváciách vstupeniek.`,
    id: 3,
    location: 'Fekišovce',
    name: 'U2 V Kultúrnom Dome Vo Fekišovciach',
    timeEnd: new Date(2019, 8, 30, 20, 0),
    timeStart: new Date(2019, 3, 1, 10, 0)
  }
];

export const nextEventId = Object.keys(mockEvents).length;
