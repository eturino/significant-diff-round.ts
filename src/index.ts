/* tslint:disable:interface-over-type-literal */
import round from "lodash.round";

export const MAX_PRECISION = +Number.EPSILON.toString().split("e-")[1];

export type Result = { a: number; b: number; precision: number };

export function significantDiffRound(a: number, b: number, minPrecision: number = 0): Result {
  const roundTo = (precision: number): Result => ({
    a: round(a, precision),
    b: round(b, precision),
    precision,
  });

  if (a === b) return roundTo(minPrecision);

  for (let precision = minPrecision; precision < MAX_PRECISION; precision++) {
    const res = roundTo(precision);
    if (res.a.toString() !== res.b.toString()) return res;
  }

  return roundTo(MAX_PRECISION);
}

export default significantDiffRound;
