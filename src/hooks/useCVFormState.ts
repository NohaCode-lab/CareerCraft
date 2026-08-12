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
import { STORAGE_KEYS } from '../utils/constants';
import { CVData } from '../types';

const CV_STORAGE_KEY = STORAGE_KEYS.CV_DATA;

const useCVFormState = () => {
  const [cvData, setCvData] = useLocalStorage<CVData>(CV_STORAGE_KEY, defaultCV as CVData);

  const safeCVData = useMemo(() => {
    const raw = (cvData && typeof cvData === 'object' ? cvData : {}) as Record<string, unknown>;
    return {
      ...defaultCV,
      ...raw,
      fullName: typeof raw.fullName === 'string' ? raw.fullName : defaultCV.fullName || '',
      title: typeof raw.title === 'string' ? raw.title : defaultCV.title || '',
      email: typeof raw.email === 'string' ? raw.email : defaultCV.email || '',
      phone: typeof raw.phone === 'string' ? raw.phone : defaultCV.phone || '',
      location: typeof raw.location === 'string' ? raw.location : defaultCV.location || '',
      summary: typeof raw.summary === 'string' ? raw.summary : defaultCV.summary || '',
      skills: typeof raw.skills === 'string' ? raw.skills : defaultCV.skills || '',
      experience: getSafeArray(raw.experience),
      education: getSafeArray(raw.education),
      languages: getSafeArray(raw.languages),
      projects: getSafeArray(raw.projects),
    } as CVData;
  }, [cvData]);

  const fullNameStr = (safeCVData.fullName || '').trim();
  const isNameInvalid = fullNameStr.length > 0 && fullNameStr.length < 3;

  const emailStr = (safeCVData.email || '').trim();
  const isEmailInvalid = emailStr.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setCvData((previousData: CVData) => ({
      ...(previousData || defaultCV),
      [name]: value,
    }));
  };

  const handleListChange = (section: keyof CVData, index: number, field: string, value: string) => {
    setCvData((previousData: CVData) => {
      const currentData = {
        ...(previousData || defaultCV),
      };

      const rawItems = currentData[section];
      const updatedItems = [...getSafeArray(rawItems)] as Record<string, unknown>[];

      updatedItems[index] = {
        ...(updatedItems[index] || {}),
        [field]: value,
      };

      return {
        ...currentData,
        [section]: updatedItems,
      } as CVData;
    });
  };

  const addItem = (section: string) => {
    const factories: Record<string, () => unknown> = {
      experience: createExperienceItem,
      education: createEducationItem,
      languages: createLanguageItem,
      projects: createProjectItem,
    };

    const createItem = factories[section];

    if (!createItem) {
      return;
    }

    setCvData((previousData: CVData) => {
      const currentData = {
        ...(previousData || defaultCV),
      };

      const key = section as keyof CVData;
      const rawItems = currentData[key];

      return {
        ...currentData,
        [section]: [...getSafeArray(rawItems), createItem()],
      } as CVData;
    });
  };

  const removeItem = (section: keyof CVData, index: number) => {
    setCvData((previousData: CVData) => {
      const currentData = {
        ...(previousData || defaultCV),
      };

      const rawItems = currentData[section];

      return {
        ...currentData,
        [section]: getSafeArray(rawItems).filter(
          (_, itemIndex) => itemIndex !== index
        ),
      } as CVData;
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
