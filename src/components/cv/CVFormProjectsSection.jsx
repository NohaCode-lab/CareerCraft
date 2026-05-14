import CVFormEmptySection from './CVFormEmptySection';
import {
  addButtonClasses,
  inputClasses,
  labelClasses,
  removeButtonClasses,
  sectionCardClasses,
} from './cvFormStyles';

const CVFormProjectsSection = ({
  items,
  onAdd,
  onRemove,
  onFieldChange,
}) => {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
        <button type="button" onClick={onAdd} className={addButtonClasses}>
          Add Project
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id || index} className={sectionCardClasses}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-800">
                  Project #{index + 1}
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
                <div className="md:col-span-2">
                  <label className={labelClasses}>Project Title</label>
                  <input
                    type="text"
                    placeholder="Portfolio Website"
                    value={item.title || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'title', event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the project, your role, and the technologies used."
                    value={item.description || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'description', event.target.value)
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Project Link</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username/project"
                    value={item.link || ''}
                    onChange={(event) =>
                      onFieldChange(index, 'link', event.target.value)
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
          title="No projects added yet."
          description='Click "Add Project" to showcase your best work.'
        />
      )}
    </div>
  );
};

export default CVFormProjectsSection;
