import { getMonth, getYear } from 'date-fns';

export const extractRawData = data => {
  const { entities, ids } = data;
  const extractedData = [];

  for (const id of ids) {
    if (Object.prototype.hasOwnProperty.call(entities, id.toString())) {
      extractedData.push(entities[id.toString()]);
    }
  }

  return extractedData;
};

export const getMonthAndYear = date => ({
  month: (getMonth(date) + 1).toString(),
  year: getYear(date).toString()
});
