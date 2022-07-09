const { describe, test, expect } = require("@jest/globals");
const scoreChecker = require("../quiz-002");

describe("Quiz 002 Test", () => {
  test('1. Jika Score lebih dari 90, scoreChecker harus mengembalikan "Selamat! Anda mendapatkan nilai A."', () => {
    expect(scoreChecker(90)).toBe("Selamat! Anda mendapatkan nilai A.");
  });
  test('2. Jika Score lebih dari 80 dan kurang dari 89, scoreChecker harus mengembalikan "Anda mendapatkan nilai B."', () => {
    expect(scoreChecker(80)).toBe("Anda mendapatkan nilai B.");
  });
  test('3. Jika Score lebih dari 70 dan kurang dari 79, scoreChecker harus mengembalikan "Anda mendapatkan nilai C"', () => {
    expect(scoreChecker(70)).toBe("Anda mendapatkan nilai C.");
  });
  test('4. Jika Score lebih dari 60 dan kurang dari 69, scoreChecker harus mengembalikan "Anda mendapatkan nilai D."', () => {
    expect(scoreChecker(60)).toBe("Anda mendapatkan nilai D.");
  });
  test('5. Jika Score kurang dari 60, scoreChecker harus mengembalikan "Anda mendapatkan nilai E"', () => {
    expect(scoreChecker(50)).toBe("Anda mendapatkan nilai E.");
  });
});
