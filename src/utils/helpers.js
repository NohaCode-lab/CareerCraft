import dayjs from 'dayjs';

// ==============================
// Date
// ==============================

export const formatDate = (date, format = 'MMM D, YYYY') => {
  if (!date) return '';

  const parsed = dayjs(date);
  if (!parsed.isValid()) return '';

  return parsed.format(format);
};

// ==============================
// ID Generator
// ==============================

export const generateId = (prefix = 'item') => {
  const random = Math.random().toString(36).slice(2, 10);
  const timestamp = Date.now().toString(36);

  return `${prefix}-${timestamp}-${random}`;
};

// ==============================
// Text
// ==============================

export const truncateText = (text = '', maxLength = 120) => {
  if (typeof text !== 'string') return '';

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
};

// ==============================
// Initials
// ==============================

export const getInitials = (value = '') => {
  if (typeof value !== 'string') return '';

  return value
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};