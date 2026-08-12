import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import { getTranslationPack } from '../../config/translations';
import {
  errorTextClasses,
  getInputClasses,
  inputClasses,
  labelClasses,
} from './cvFormStyles';

interface CVFormProfileSectionProps {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  isNameInvalid?: boolean;
  isEmailInvalid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CVFormProfileSection: React.FC<CVFormProfileSectionProps> = ({
  fullName,
  title,
  email,
  phone,
  location,
  summary,
  isNameInvalid = false,
  isEmailInvalid = false,
  onChange,
}) => {
  const { language } = useLanguage();
  const t = getTranslationPack(language);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            {t.fullNameLabel}
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder={t.fullNamePlaceholder}
            value={fullName}
            onChange={onChange}
            className={getInputClasses(isNameInvalid)}
            autoComplete="name"
          />
          {isNameInvalid && (
            <p className={errorTextClasses}>
              {t.nameLengthError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="title" className={labelClasses}>
            {t.jobTitleLabel}
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder={t.jobTitlePlaceholder}
            value={title}
            onChange={onChange}
            className={inputClasses}
            autoComplete="organization-title"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            {t.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={onChange}
            className={getInputClasses(isEmailInvalid)}
            autoComplete="email"
          />
          {isEmailInvalid && (
            <p className={errorTextClasses}>{t.emailInvalidError}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            {t.phoneLabel}
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder={t.phonePlaceholder}
            value={phone}
            onChange={onChange}
            className={inputClasses}
            autoComplete="tel"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="location" className={labelClasses}>
            {t.locationLabel}
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder={t.locationPlaceholder}
            value={location}
            onChange={onChange}
            className={inputClasses}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="summary" className={labelClasses}>
          {t.summaryLabel}
        </label>
        <textarea
          id="summary"
          name="summary"
          placeholder={t.summaryPlaceholder}
          value={summary}
          onChange={onChange}
          rows={4}
          className={inputClasses}
        />
      </div>
    </>
  );
};

export default CVFormProfileSection;
