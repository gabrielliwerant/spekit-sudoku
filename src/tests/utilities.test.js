import {
  convertObjectToFormData,
  isMultipleOfThreeButNotNine
} from '../utilities';

describe('utilities.js', () => {
  describe('convertObjectToFormData', () => {
    it('should properly convert object to form data for sudoku requests', () => {
      const expected = ['board', '{"foo":"bar","baz":"qux"}'];
      const actual = convertObjectToFormData({ foo: 'bar', baz: 'qux' })
        .entries()
        .next().value;

      expect(actual).toEqual(expected);
    });
  });

  describe('isMultipleOfThreeButNotNine', () => {
    it('should find multiples of 3 that are not also multiples of 9', () => {
      expect(isMultipleOfThreeButNotNine(1)).toBe(false);
      expect(isMultipleOfThreeButNotNine(2)).toBe(false);
      expect(isMultipleOfThreeButNotNine(3)).toBe(true);
      expect(isMultipleOfThreeButNotNine(4)).toBe(false);
      expect(isMultipleOfThreeButNotNine(5)).toBe(false);
      expect(isMultipleOfThreeButNotNine(6)).toBe(true);
      expect(isMultipleOfThreeButNotNine(7)).toBe(false);
      expect(isMultipleOfThreeButNotNine(8)).toBe(false);
      expect(isMultipleOfThreeButNotNine(9)).toBe(false);
      expect(isMultipleOfThreeButNotNine(0)).toBe(false);
    });
  });
});
