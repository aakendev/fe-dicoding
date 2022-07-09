const { describe, test, expect } = require("@jest/globals");
const { firstName, lastName, age, isMarried } = require("../quiz-001");

describe("Quiz 001 Test", () => {
  test("1. firstName harus berupa string.", () => {
    expect(typeof firstName).toBe("string");
  });
  test("2. lastName harus berupa string.", () => {
    expect(typeof lastName).toBe("string");
  });
  test("3. age harus berupa number.", () => {
    expect(typeof age).toBe("number");
  });
  test("4. isMarried harus berupa boolean.", () => {
    expect(typeof isMarried).toBe("boolean");
  });
});
