/**
 * ISO8601형식의 날짜를 yyyy-mm-dd형식으로 파싱
 * @param {string} isoDate iso-8601형식의 날짜 데이터 (2017-03-11T11:30:00)
 * @returns yyyy-mm-dd
 */
export const ISOToyyyymmdd = (isoDate) => {
  const dateJsType = new Date(isoDate);
  const yyyy = dateJsType.getFullYear();
  const month = dateJsType.getMonth() + 1;
  const date = dateJsType.getDate();
  const mm = month < 10 ? `0${month}` : month;
  const dd = date < 10 ? `${date}` : date;
  return `${yyyy}-${mm}-${dd}`;
};
