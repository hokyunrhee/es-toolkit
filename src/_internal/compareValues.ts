/**
 * Weight used to push `NaN`, `null` and `undefined` after other values when sorting,
 * in the order `NaN` < `null` < `undefined`.
 *
 * @param value - The value to rank.
 * @returns `0` for a regular value, otherwise `1` (`NaN`), `2` (`null`) or `3` (`undefined`).
 */
function nullishRank(value: unknown): number {
  if (Number.isNaN(value)) {
    return 1;
  }
  if (value === null) {
    return 2;
  }
  if (value === undefined) {
    return 3;
  }
  return 0;
}

/**
 * Compares two values in ascending order, placing `NaN`, `null` and `undefined` last.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @returns `-1` if `a` sorts first, `1` if `b` sorts first, otherwise `0`.
 */
function compareAscending(a: unknown, b: unknown): 0 | -1 | 1 {
  const aRank = nullishRank(a);
  const bRank = nullishRank(b);

  // Compare by rank first: regular value (0) < NaN (1) < null (2) < undefined (3).
  if (aRank < bRank) {
    return -1;
  }
  if (aRank > bRank) {
    return 1;
  }
  if (aRank !== 0) {
    return 0; // Both are the same kind of special value.
  }

  // Both are regular values.
  if ((a as number) < (b as number)) {
    return -1;
  }
  if ((a as number) > (b as number)) {
    return 1;
  }
  return 0;
}

/**
 * Compares two values for sorting in the given order.
 *
 * @param a - The first value.
 * @param b - The second value.
 * @param order - `'asc'` or `'desc'`.
 * @returns A negative, zero or positive number, as `Array.prototype.sort` expects.
 */
export function compareValues(a: unknown, b: unknown, order: 'asc' | 'desc'): 0 | -1 | 1 {
  // Descending order is the ascending comparison with the operands swapped.
  return order === 'asc' ? compareAscending(a, b) : compareAscending(b, a);
}
