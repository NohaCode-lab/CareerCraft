import { useMemo } from 'react';

import useLocalStorage from './useLocalStorage';

import {
  createEducationItem,
  createExperienceItem,
  createLanguageItem,
  createProjectItem,
  defaultCV,
  getSafeArray,
} from '../components/cv/cvFormModel';

const CV_STORAGE_KEY = 'cvData';

const useCVFormState = () => {
  const [cvData, setCvData] = useLocalStorage(CV_STORAGE_KEY, defaultCV);

  const safeCVData = useMemo(() => {
    return {
      ...defaultCV,
      ...(cvData || {}),
      experience: getSafeArray(cvData?.experience),
      education: getSafeArray(cvData?.education),
      languages: getSafeArray(cvData?.languages),
      projects: getSafeArray(cvData?.projects),
    };
  }, [cvData]);

  const isNameInvalid =
    safeCVData.fullName.trim().length > 0 &&
    safeCVData.fullName.trim().length < 3;

  const isEmailInvalid =
    safeCVData.email.trim().length > 0 &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeCVData.email.trim());

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCvData((previousData) => ({
      ...defaultCV,
      ...(previousData || {}),
      [name]: value,
    }));
  };

  const handleListChange = (section, index, field, value) => {
    setCvData((previousData) => {
      const currentData = {
        ...defaultCV,
        ...(previousData || {}),
      };

      const updatedItems = [...getSafeArray(currentData[section])];

      updatedItems[index] = {
        ...(updatedItems[index] || {}),
        [field]: value,
      };

      return {
        ...currentData,
        [section]: updatedItems,
      };
    });
  };

  const addItem = (section) => {
    const factories = {
      experience: createExperienceItem,
      education: createEducationItem,
      languages: createLanguageItem,
      projects: createProjectItem,
    };

    const createItem = factories[section];

    if (!createItem) {
      return;
    }

    setCvData((previousData) => {
      const currentData = {
        ...defaultCV,
        ...(previousData || {}),
      };

      return {
        ...currentData,
        [section]: [...getSafeArray(currentData[section]), createItem()],
      };
    });
  };

  const removeItem = (section, index) => {
    setCvData((previousData) => {
      const currentData = {
        ...defaultCV,
        ...(previousData || {}),
      };

      return {
        ...currentData,
        [section]: getSafeArray(currentData[section]).filter(
          (_, itemIndex) => itemIndex !== index
        ),
      };
    });
  };

  return {
    safeCVData,
    isNameInvalid,
    isEmailInvalid,
    handleChange,
    handleListChange,
    addItem,
    removeItem,
  };
};

export default useCVFormState;
