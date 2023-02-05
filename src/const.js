const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DateFormat = {
  SHORT: 'D MMM',
  FULL: 'd/m/y H:i',
  TIME: 'HH:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const TripMessageText = {
  NO_POINTS: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FUTURE: 'There are no future events now',
  EVERYTHING: 'There are no events now',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { POINT_TYPES, TripMessageText, FilterType, SortType, DateFormat, UserAction, UpdateType };
