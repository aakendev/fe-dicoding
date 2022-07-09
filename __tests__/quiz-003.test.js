const { describe, test, expect } = require("@jest/globals");
const { restaurant, name, favoriteDrink } = require("../quiz-003");

describe("Quiz 003 Test", () => {
  test('1. Variabel restaurant harus memiliki object property bernama "name".', () => {
    expect(Object.keys(restaurant).some((e) => e === "name")).toBe(true);
  });
  test("2. Object Property name harus berupa String.", () => {
    expect(typeof restaurant.name).toBe("string");
  });
  test("3. Object Property name tidak boleh kosong atau null.", () => {
    expect(restaurant.name).not.toBe(" " || null);
  });
  test('4. Variabel restaurant harus memiliki object property bernama "city".', () => {
    expect(Object.keys(restaurant).some((e) => e === "city")).toBe(true);
  });
  test("5. Object Property city harus berupa String.", () => {
    expect(typeof restaurant.city).toBe("string");
  });
  test("6. Object Property city tidak boleh kosong atau null.", () => {
    expect(restaurant.city).not.toBe(" " || null);
  });
  test('7. Variabel restaurant harus memiliki object property bernama "favorite drink".', () => {
    expect(Object.keys(restaurant).some((e) => e === "favorite drink")).toBe(
      true
    );
  });
  test("8. Object Property favorite drink harus berupa String.", () => {
    expect(typeof restaurant["favorite drink"]).toBe("string");
  });
  test("9. Object Property favorite drink tidak boleh kosong atau null.", () => {
    expect(restaurant["favorite drink"]).not.toBe(" " || null);
  });
  test('10. Variabel restaurant harus memiliki object property bernama "favorite food".', () => {
    expect(Object.keys(restaurant).some((e) => e === "favorite food")).toBe(
      true
    );
  });
  test("11. Object Property favorite food harus berupa String.", () => {
    expect(typeof restaurant["favorite food"]).toBe("string");
  });
  test("12. Object Property favorite food tidak boleh kosong atau null.", () => {
    expect(restaurant["favorite food"]).not.toBe(" " || null);
  });
  test('13. Variabel restaurant harus memiliki object property bernama "isVegan".', () => {
    expect(Object.keys(restaurant).some((e) => e === "isVegan")).toBe(true);
  });
  test("14. Object Property isVegan harus berupa Boolean.", () => {
    expect(typeof restaurant.isVegan).toBe("boolean");
  });
  test("15. Variabel name harus sama dengan Property name pada Object restaurant.", () => {
    expect(name).toBe(restaurant.name);
  });
  test("16. Variabel favoriteDrink harus sama dengan Property favorite drink pada Object restaurant.", () => {
    expect(favoriteDrink).toBe(restaurant["favorite drink"]);
  });
});
