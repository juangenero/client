/**
 * Convierte una fecha
 * @param {Date} date fecha
 * @returns fecha en formato YYYY-MM-DD
 */
function dateFormat(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let fullYear = date.getFullYear();

  return `${fullYear}-${month}-${day}`;
}

export default dateFormat;
