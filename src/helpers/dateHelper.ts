import dayjs from 'dayjs';

export const getHumanizedDate = () => {
  return dayjs().format('MMM D');
};
