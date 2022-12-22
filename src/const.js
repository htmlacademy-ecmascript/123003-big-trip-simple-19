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

const TripMessageText = {
  NO_POINTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
};

const FilterMessageText = {
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

export { POINT_TYPES, TripMessageText, FilterMessageText };
