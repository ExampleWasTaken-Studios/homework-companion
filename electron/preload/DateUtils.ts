/**
 * Convert a TS date instance to a string that matches the HTML format specification.
 * @param date The date instance that should be converted. Defaults to current date if not passed.
 * @returns A string formatted to match the HTML date specification
 */
export const getHTMLDateFormat = (date: Date = new Date()): string => {
  let month: string;
  let day: string;
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  } else {
    month = date.getMonth().toString();
  }
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  } else {
    day = date.getDate().toString();
  }


  return `${date.getFullYear()}-${month}-${day}`;
};

/**
 * Check if a date is valid.
 * @param date The date instance that should be validated.
 * @returns True if the date passed is valid, false otherwise
 */
export const isValidDate = (date: Date): boolean => {

  if (isNaN(date as unknown as number)) {
    return false;
  }

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  if (date.getDate() > daysInMonth(date.getMonth(), date.getFullYear())) {
    return false;
  }

  if (date.getMonth() > 12) {
    return false;
  }

  if (date.getFullYear() > 260000) {
    return false;
  }

  return true;
};
