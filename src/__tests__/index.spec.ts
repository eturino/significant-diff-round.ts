import round from "lodash.round";
import { MAX_PRECISION, significantDiffRound } from "..";

describe("significantDiffRound(a, b) => { a: roundedA, b: roundedB, precision: p }", () => {
  describe("with a == b", () => {
    it("without 3rd optional param (minPrecision)", () => {
      expect(significantDiffRound(1.1234567, 1.1234567)).toEqual({
        a: 1,
        b: 1,
        precision: 0,
      });
    });

    it("with 3rd optional param (minPrecision)", () => {
      expect(significantDiffRound(1.1234123, 1.1234123, 4)).toEqual({
        a: 1.1234,
        b: 1.1234,
        precision: 4,
      });
    });
  });

  describe("without 3rd optional param (minPrecision)", () => {
    [
      { a: 11.1, b: 12, expected: { a: 11, b: 12, precision: 0 } },
      { a: 11.1, b: 11.2, expected: { a: 11.1, b: 11.2, precision: 1 } },
      { a: 11.1, b: 11.1231, expected: { a: 11.1, b: 11.12, precision: 2 } },
      { a: 1.1232, b: 1.1236, expected: { a: 1.123, b: 1.124, precision: 3 } },
      {
        a: 1,
        b: 1 - Number.EPSILON,
        expected: {
          a: 1,
          b: round(1 - Number.EPSILON, MAX_PRECISION),
          precision: MAX_PRECISION,
        },
      },
      {
        a: 11.12340101,
        b: 11.12311231,
        expected: { a: 11.1234, b: 11.1231, precision: 4 },
      },
    ].forEach(({ a, b, expected }) => {
      it(`a: ${a}, b: ${b} => ${JSON.stringify(expected)}`, () => {
        expect(significantDiffRound(a, b)).toEqual(expected);
      });
    });
  });

  describe("with 3rd optional param (minPrecision)", () => {
    const min = 2;
    [
      {
        a: 11.1441,
        b: 12.1234,
        expected: { a: 11.14, b: 12.12, precision: 2 },
      },
      { a: 11.1, b: 11.2, expected: { a: 11.1, b: 11.2, precision: 2 } },
      { a: 11.1, b: 11.1231, expected: { a: 11.1, b: 11.12, precision: 2 } },
      { a: 1.1232, b: 1.1236, expected: { a: 1.123, b: 1.124, precision: 3 } },
      {
        a: 1,
        b: 1 - Number.EPSILON,
        expected: {
          a: 1,
          b: round(1 - Number.EPSILON, MAX_PRECISION),
          precision: MAX_PRECISION,
        },
      },
      {
        a: 11.12340101,
        b: 11.12311231,
        expected: { a: 11.1234, b: 11.1231, precision: 4 },
      },
    ].forEach(({ a, b, expected }) => {
      it(`a: ${a}, b: ${b}, minPrecision: ${min} => ${JSON.stringify(expected)}`, () => {
        expect(significantDiffRound(a, b, min)).toEqual(expected);
      });
    });
  });
});
