
export const isRequired = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined && String(value).trim() !== '';
};

export const isEmail = (value) => {
  if (!isRequired(value)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
};

export const isUrl = (value) => {
  if (!isRequired(value)) {
    return false;
  }

  try {
    new URL(String(value).trim());
    return true;
  } catch {
    return false;
  }
};

export const minLength = (value, min) => {
  if (!isRequired(value)) {
    return false;
  }

  return String(value).trim().length >= min;
};

export const maxLength = (value, max) => {
  if (!isRequired(value)) {
    return false;
  }

  return String(value).trim().length <= max;
};

export const isPhoneNumber = (value) => {
  if (!isRequired(value)) {
    return false;
  }

  return /^[+]?[\d\s\-()]{7,20}$/.test(String(value).trim());
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