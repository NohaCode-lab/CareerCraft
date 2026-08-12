import React, { memo } from "react";
import CVFormEmptySection from "./CVFormEmptySection";
import useLanguage from "../../hooks/useLanguage";
import { getTranslationPack } from "../../config/translations";
import {
  addButtonClasses,
  inputClasses,
  labelClasses,
  removeButtonClasses,
  sectionCardClasses,
} from "./cvFormStyles";

export interface ExperienceItem {
  id?: string;
  role?: string;
  company?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  description?: string;
}

interface CVFormExperienceSectionProps {
  items: ExperienceItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onFieldChange: (index: number, field: string, value: string) => void;
}

const CVFormExperienceSection: React.FC<CVFormExperienceSectionProps> = ({
  items,
  onAdd,
  onRemove,
  onFieldChange,
}) => {
  const { language } = useLanguage();
  const t = getTranslationPack(language);

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">{t.experience}</h3>
        <button type="button" onClick={onAdd} className={addButtonClasses}>
          {t.addExperience}
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className={sectionCardClasses}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800">
                  {t.experience} #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className={removeButtonClasses}
                >
                  {t.delete || 'Remove'}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClasses}>{t.roleLabel}</label>
                  <input
                    type="text"
                    placeholder={t.jobTitlePlaceholder}
                    value={item.role || ""}
                    onChange={(event) =>
                      onFieldChange(index, "role", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>{t.companyLabel}</label>
                  <input
                    type="text"
                    placeholder={t.companyNameLabel}
                    value={item.company || ""}
                    onChange={(event) =>
                      onFieldChange(index, "company", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>{t.durationLabel}</label>
                  <input
                    type="text"
                    placeholder="Jan 2024 - Present"
                    value={item.duration || ""}
                    onChange={(event) =>
                      onFieldChange(index, "duration", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>{t.descriptionLabel}</label>
                  <textarea
                    rows={4}
                    placeholder={t.experienceDescriptionPlaceholder}
                    value={item.description || ""}
                    onChange={(event) =>
                      onFieldChange(index, "description", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CVFormEmptySection
          title={t.noExperienceTitle}
          description={t.noExperienceDesc}
        />
      )}
    </div>
  );
};

export default memo(CVFormExperienceSection);
