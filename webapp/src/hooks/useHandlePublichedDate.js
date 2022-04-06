import dayjs from 'dayjs';
import { useCallback } from 'react';
import { DAY_SEC, HOUR_SEC, MINUTES_SEC, MONTH_SEC, WEEK_SEC, YEAR_SEC } from 'constant/time';

function useHandlePublishedDate() {
  const nowDate = dayjs();
  const handlePublishedDate = useCallback((targetDate) => {
    let diffType = 'second';
    const diff = nowDate.diff(targetDate, diffType);
    let unit = '초';
    if (diff < 5) {
      return '방금전';
    }
    if (diff < MINUTES_SEC) {
      diffType = 'second';
      unit = '초';
    } else if (diff < HOUR_SEC) {
      diffType = 'minute';
      unit = '분';
    } else if (diff < DAY_SEC) {
      diffType = 'hour';
      unit = '시간';
    } else if (diff < WEEK_SEC) {
      diffType = 'day';
      unit = '일';
    } else if (diff < MONTH_SEC) {
      diffType = 'week';
      unit = '주일';
    } else if (diff < YEAR_SEC) {
      diffType = 'month';
      unit = '달';
    } else {
      diffType = 'year';
      unit = '년';
    }
    return `${nowDate.diff(targetDate, diffType)}${unit} 전`;
  }, []);
  return [handlePublishedDate];
}
export default useHandlePublishedDate;
