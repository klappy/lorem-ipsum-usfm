export const _getRandomInt = (min, max) => {
  return Math.round((min - 0.5) + Math.random() * (max - min + 1));
};

export const getRandomInt = (min, max, bias) => {
  // TODO: write real bias algorithm.
  let _bias = bias;
  _bias = (bias > max) && max;
  _bias = (bias < min) && min;
  let random = (_getRandomInt(min, max) + _bias * 2)/3;
  return random;
};