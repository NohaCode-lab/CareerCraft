import React from 'react';
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
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelClasses}>
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={onChange}
            className={getInputClasses(isNameInvalid)}
            autoComplete="name"
          />
          {isNameInvalid && (
            <p className={errorTextClasses}>
              Name must be at least 3 characters.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="title" className={labelClasses}>
            Job Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Front-End Developer"
            value={title}
            onChange={onChange}
            className={inputClasses}
            autoComplete="organization-title"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            value={email}
            onChange={onChange}
            className={getInputClasses(isEmailInvalid)}
            autoComplete="email"
          />
          {isEmailInvalid && (
            <p className={errorTextClasses}>Enter a valid email address.</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+20 100 000 0000"
            value={phone}
            onChange={onChange}
            className={inputClasses}
            autoComplete="tel"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="location" className={labelClasses}>
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Cairo, Egypt"
            value={location}
            onChange={onChange}
            className={inputClasses}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="summary" className={labelClasses}>
          Professional Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          placeholder="Write a short professional summary that highlights your strengths, experience, and career focus."
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
