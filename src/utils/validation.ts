export const isNotEmptyString = (value: string) => value !== "";
export const isBetween = (min: number, max: number) => (value: number) =>
  value >= min && value <= max;

// Standard used by browsers for HTML5 email input validation (taken from MDN)
export const isEmail = (value: string) =>
  new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    "g"
  ).test(value);
