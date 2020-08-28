const roundFloatNumber = (number) => Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100;

export {
  roundFloatNumber,
};
