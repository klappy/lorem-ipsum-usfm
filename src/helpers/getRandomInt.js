export const _getRandomInt = (min, max) => {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
};

export const getRandomInt = (min, max, bias) => {
  // TODO: write real bias algorithm.
  return (_getRandomInt(min, max) + bias * 2)/3;
};