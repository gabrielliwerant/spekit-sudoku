/**
 * utilities.js
 *
 * Helper functions for use throughout the application.
 */

/**
 * Transform a plain javascript object to form data, preserving special
 * characters.
 *
 * @param {object} data
 * @returns {FormData}
 */
const convertObjectToFormData = data => {
  const payload = encodeURIComponent(JSON.stringify(data));
  const formData = new FormData();

  formData.append('board', decodeURIComponent(payload));

  return formData;
};

/**
 * Determine if a given number is a multiple of 3 and not a multiple of 9.
 *
 * @param {number} n
 * @returns {boolean}
 */
const isMultipleOfThreeButNotNine = n => n % 3 === 0 && n % 9 !== 0;

export { convertObjectToFormData, isMultipleOfThreeButNotNine };
