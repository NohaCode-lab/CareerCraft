
import dayjs from 'dayjs';

export const formatDate = (date) => dayjs(date).format('MMM D, YYYY');

export const generateId = (prefix = 'item') =>
  `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const truncateText = (text = '', maxLength = 120) => {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
};

export const getInitials = (value = '') => {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
};