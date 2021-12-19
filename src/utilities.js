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

export { convertObjectToFormData };
