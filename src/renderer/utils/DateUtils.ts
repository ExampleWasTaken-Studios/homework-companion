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
