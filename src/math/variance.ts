import { mean } from './mean.ts';

/**
 * Calculates the population variance of an array of numbers.
 *
 * The variance is the average of the squared differences from the mean.
 * If the array is empty, this function returns `NaN`.
 *
 * @param nums - An array of numbers to calculate the variance.
 * @returns The population variance of all the numbers in the array.
 *
 * @example
 * const numbers = [2, 4, 4, 4, 5, 5, 7, 9];
 * const result = variance(numbers);
 * // result will be 4
 */
export function variance(nums: readonly number[]): number {
  if (nums.length === 0) {
    return NaN;
  }

  const average = mean(nums);
  let sumOfSquares = 0;

  for (let i = 0; i < nums.length; i++) {
    const difference = nums[i] - average;
    sumOfSquares += difference * difference;
  }

  return sumOfSquares / nums.length;
}
