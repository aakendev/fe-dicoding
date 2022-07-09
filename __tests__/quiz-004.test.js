const { describe, test, expect } = require("@jest/globals");
const evenNumber = require("../quiz-004");

describe("Quiz 004 Test", () => {
  test("1. Variabel evenNumber harus berupa Array.", () => {
    expect(typeof evenNumber).toBe("object");
  });
  test("2. Array evenNumber harus kurang dari sama dengan 100.", () => {
    expect(evenNumber.every((e) => e <= 100)).toBe(true);
  });
  test("3. Array evenNumber harus merupakan bilangan genap.", () => {
    expect(evenNumber.every((e) => e % 2 === 0)).toBe(true);
  });
});
