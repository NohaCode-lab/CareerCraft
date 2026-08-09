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
    const raw = cvData && typeof cvData === 'object' ? cvData : {};
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
    };
  }, [cvData]);

  const fullNameStr = (safeCVData.fullName || '').trim();
  const isNameInvalid = fullNameStr.length > 0 && fullNameStr.length < 3;

  const emailStr = (safeCVData.email || '').trim();
  const isEmailInvalid = emailStr.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setCvData((previousData: any) => ({
      ...defaultCV,
      ...(previousData || {}),
      [name]: value,
    }));
  };

  const handleListChange = (section: string, index: number, field: string, value: string) => {
    setCvData((previousData: any) => {
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

  const addItem = (section: string) => {
    const factories: Record<string, () => any> = {
      experience: createExperienceItem,
      education: createEducationItem,
      languages: createLanguageItem,
      projects: createProjectItem,
    };

    const createItem = factories[section];

    if (!createItem) {
      return;
    }

    setCvData((previousData: any) => {
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

  const removeItem = (section: string, index: number) => {
    setCvData((previousData: any) => {
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
