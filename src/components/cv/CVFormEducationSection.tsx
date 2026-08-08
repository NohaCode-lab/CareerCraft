import React, { memo } from "react";
import CVFormEmptySection from "./CVFormEmptySection";
import {
  addButtonClasses,
  inputClasses,
  labelClasses,
  removeButtonClasses,
  sectionCardClasses,
} from "./cvFormStyles";

export interface EducationItem {
  id?: string;
  degree?: string;
  school?: string;
  year?: string;
  [key: string]: any;
}

interface CVFormEducationSectionProps {
  items: EducationItem[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onFieldChange: (index: number, field: string, value: string) => void;
}

const CVFormEducationSection: React.FC<CVFormEducationSectionProps> = ({
  items,
  onAdd,
  onRemove,
  onFieldChange,
}) => {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Education</h3>
        <button type="button" onClick={onAdd} className={addButtonClasses}>
          Add Education
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className={sectionCardClasses}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800">
                  Education #{index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className={removeButtonClasses}
                >
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClasses}>Degree</label>
                  <input
                    type="text"
                    placeholder="Bachelor of Computer Science"
                    value={item.degree || ""}
                    onChange={(event) =>
                      onFieldChange(index, "degree", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>School</label>
                  <input
                    type="text"
                    placeholder="University Name"
                    value={item.school || ""}
                    onChange={(event) =>
                      onFieldChange(index, "school", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Year</label>
                  <input
                    type="text"
                    placeholder="2024"
                    value={item.year || ""}
                    onChange={(event) =>
                      onFieldChange(index, "year", event.target.value)
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
          title="No education added yet."
          description='Click "Add Education" to add your academic background.'
        />
      )}
    </div>
  );
};

export default memo(CVFormEducationSection);
