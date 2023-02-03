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
};

const FilterMessageText = {
  PAST: 'There are no past events now',
  FUTURE: 'There are no future events now',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { POINT_TYPES, TripMessageText, FilterMessageText, FilterType, SortType, DateFormat, UserAction, UpdateType };
