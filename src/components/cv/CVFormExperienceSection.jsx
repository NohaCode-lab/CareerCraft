import CVFormEmptySection from './CVFormEmptySection';
import {
  addButtonClasses,
  inputClasses,
  labelClasses,
  removeButtonClasses,
  sectionCardClasses,
} from './cvFormStyles';

const CVFormExperienceSection = ({
  items,
  onAdd,
  onRemove,
  onFieldChange,
}) => {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
        <button type="button" onClick={onAdd} className={addButtonClasses}>
          Add Experience
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className={sectionCardClasses}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800">
                  Experience #{index + 1}
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
                  <label className={labelClasses}>Role</label>
                  <input
                    type="text"
                    placeholder="Front-End Developer"
                    value={item.role || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'role', event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Company</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={item.company || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'company', event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Duration</label>
                  <input
                    type="text"
                    placeholder="Jan 2024 - Present"
                    value={item.duration || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'duration', event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your responsibilities and achievements."
                    value={item.description || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'description', event.target.value)
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
          title="No experience added yet."
          description='Click "Add Experience" to start building your career story.'
        />
      )}
    </div>
  );
};

export default CVFormExperienceSection;
