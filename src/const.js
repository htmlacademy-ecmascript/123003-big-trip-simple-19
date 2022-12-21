const COUNT = 3;

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const NO_SELECTED_OFFERS = 'No additional offers';
const TripMessageText = {
  NO_POINTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
};

const FilterMessageText = {
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
  ALL: 'Click New Event to create your first point',
};

export { COUNT, POINT_TYPES, TripMessageText, FilterMessageText, NO_SELECTED_OFFERS };
