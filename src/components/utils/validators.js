const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,20}$/;

const toSafeString = (value) => String(value ?? '').trim();

export const isRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return toSafeString(value) !== '';
};

export const isEmail = (value) => {
  const safeValue = toSafeString(value);

  if (!isRequired(safeValue)) {
    return false;
  }

  return EMAIL_REGEX.test(safeValue);
};

export const isUrl = (value) => {
  const safeValue = toSafeString(value);

  if (!isRequired(safeValue)) {
    return false;
  }

  try {
    new URL(safeValue);
    return true;
  } catch {
    return false;
  }
};

export const minLength = (value, min) => {
  const safeValue = toSafeString(value);

  if (!isRequired(safeValue)) {
    return false;
  }

  return safeValue.length >= min;
};

export const maxLength = (value, max) => {
  const safeValue = toSafeString(value);

  if (!isRequired(safeValue)) {
    return false;
  }

  return safeValue.length <= max;
};

export const isPhoneNumber = (value) => {
  const safeValue = toSafeString(value);

  if (!isRequired(safeValue)) {
    return false;
  }

  return PHONE_REGEX.test(safeValue);
};

export const validateCVForm = (formData = {}) => {
  const errors = {};

  if (!isRequired(formData.fullName)) {
    errors.fullName = 'Full name is required.';
  }

  if (!isEmail(formData.email)) {
    errors.email = 'A valid email address is required.';
  }

  if (formData.phone && !isPhoneNumber(formData.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (formData.portfolio && !isUrl(formData.portfolio)) {
    errors.portfolio = 'Please enter a valid portfolio URL.';
  }

  if (formData.linkedin && !isUrl(formData.linkedin)) {
    errors.linkedin = 'Please enter a valid LinkedIn URL.';
  }

  if (formData.summary && !minLength(formData.summary, 20)) {
    errors.summary = 'Summary must be at least 20 characters long.';
  }

  return errors;
};

export const hasValidationErrors = (errors = {}) => {
  return Object.keys(errors).length > 0;
};