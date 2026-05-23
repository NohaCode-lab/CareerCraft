import { memo } from "react";
import CVFormEmptySection from "./CVFormEmptySection";
import {
  addButtonClasses,
  inputClasses,
  labelClasses,
  removeButtonClasses,
  sectionCardClasses,
} from "./cvFormStyles";

const CVFormLanguagesSection = ({ items, onAdd, onRemove, onFieldChange }) => {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Languages</h3>
        <button type="button" onClick={onAdd} className={addButtonClasses}>
          Add Language
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className={sectionCardClasses}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800">
                  Language #{index + 1}
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
                  <label className={labelClasses}>Language</label>
                  <input
                    type="text"
                    placeholder="English"
                    value={item.name || ""}
                    onChange={(event) =>
                      onFieldChange(index, "name", event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Level</label>
                  <input
                    type="text"
                    placeholder="Fluent"
                    value={item.level || ""}
                    onChange={(event) =>
                      onFieldChange(index, "level", event.target.value)
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
          title="No languages added yet."
          description='Click "Add Language" to show your language skills.'
        />
      )}
    </div>
  );
};

export default memo(CVFormLanguagesSection);
