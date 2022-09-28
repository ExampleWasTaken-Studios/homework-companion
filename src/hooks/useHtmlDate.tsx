export const useHtmlDate = () =>  {
  return (date: Date = new Date()) => {
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
};
