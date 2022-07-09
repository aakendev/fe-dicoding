const { describe, test, expect } = require("@jest/globals");
const { minimal, power } = require("../quiz-005");

describe("Quiz 005 Test", () => {
  test("1. Variabel minimal harus berupa function.", () => {
    expect(typeof minimal).toBe("function");
  });
  test("2. Fungsi minimal harus mengembalikan nilai yang paling terkecil.", () => {
    expect(minimal(1, 4)).toBe(1);
    expect(minimal(3, 2)).toBe(2);
  });
  test("3. Fungsi minimal harus mengembalikan nilai pertama jika sama.", () => {
    expect(minimal(3, 3)).toBe(3);
  });
  test("4. Variabel power harus berupa function.", () => {
    expect(typeof power).toBe("function");
  });
  test("5. Fungsi power harus mengembalikan nilai kuadrat dari nilai pertama atas nilai kedua.", () => {
    expect(power(7, 3)).toBe(343);
    expect(power(3, 3)).toBe(27);
    expect(power(4, 0.5)).toBe(2);
  });
});
