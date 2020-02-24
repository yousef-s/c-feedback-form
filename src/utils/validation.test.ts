import { isNotEmptyString, isEmail, isBetween } from "./validation";

describe("#isNotEmptyString", () => {
  it("should return true if the value is not an empty string", () => {
    expect(isNotEmptyString("")).toBe(false);
    expect(isNotEmptyString("f")).toBe(true);
  });
});

describe("#isBetween", () => {
  it("should return true if the value is between the defined range", () => {
    const predicate = isBetween(1, 5);
    expect(predicate(10)).toBe(false);
    expect(predicate(3)).toBe(true);
  });
});

describe("#isEmail", () => {
  it("should return true if the value is a valid email", () => {
    expect(isEmail("foo")).toBe(false);
    expect(isEmail("foo@bar.com")).toBe(true);
  });
});
