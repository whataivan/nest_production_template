export const getDifferenceInDays = (date1, date2) => {
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  const diffInMilliseconds = Math.abs(time1 - time2);

  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diffInDays = diffInMilliseconds / millisecondsInDay;

  return diffInDays;
};
