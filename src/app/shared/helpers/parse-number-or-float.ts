export const parseNumberOrFloat = (value: any): number => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
};
