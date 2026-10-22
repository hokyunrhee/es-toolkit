import { describe, expect, it } from 'vitest';
import { clamp } from './clamp';

describe('clamp function', () => {
  it('works with max', () => {
    expect(clamp(3, 5)).toBe(3);
    expect(clamp(10, 6)).toBe(6);
    expect(clamp(6, 10)).toBe(6);
  });

  it('works with max and min', () => {
    expect(clamp(3, 5, 10)).toBe(5);
    expect(clamp(10, 6, 10)).toBe(10);
    expect(clamp(6, 10, 10)).toBe(10);
    expect(clamp(7, 5, 10)).toBe(7);
    expect(clamp(100, 5, 6)).toBe(6);
  });

  it('accepts the bounds in reverse order', () => {
    expect(clamp(5, 10, 0)).toBe(5);
    expect(clamp(-5, 10, 0)).toBe(0);
    expect(clamp(15, 10, 0)).toBe(10);
    expect(clamp(2, 15, 5)).toBe(5);
  });
});
