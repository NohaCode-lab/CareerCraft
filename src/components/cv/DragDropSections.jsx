import React, { useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const sectionConfig = [
  { id: 'summary', label: 'Professional Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'projects', label: 'Projects' },
];

const defaultSections = sectionConfig.map((section) => section.id);

const getSafeSections = (value) => {
  if (!Array.isArray(value)) {
    return defaultSections;
  }

  const validIds = new Set(defaultSections);

  const filteredSections = value.filter(
    (sectionId, index) =>
      typeof sectionId === 'string' &&
      validIds.has(sectionId) &&
      value.indexOf(sectionId) === index
  );

  const missingSections = defaultSections.filter(
    (sectionId) => !filteredSections.includes(sectionId)
  );

  return [...filteredSections, ...missingSections];
};

const getSectionLabel = (id) => {
  return (
    sectionConfig.find((section) => section.id === id)?.label || 'Section'
  );
};

const SortableSectionItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        'flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm transition-all',
        isDragging
          ? 'border-indigo-300 shadow-md ring-2 ring-indigo-100'
          : 'border-slate-200 hover:border-slate-300',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span className="text-slate-400">
          <GripVertical size={18} />
        </span>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            {getSectionLabel(id)}
          </p>
          <p className="text-xs text-slate-500">
            Drag to change section order in your CV
          </p>
        </div>
      </div>

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
        aria-label={`Drag ${getSectionLabel(id)}`}
      >
        Drag
      </button>
    </div>
  );
};

const DragDropSections = () => {
  const [storedSections, setStoredSections] = useLocalStorage(
    'cvSections',
    defaultSections
  );

  const sections = useMemo(
    () => getSafeSections(storedSections),
    [storedSections]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = sections.indexOf(active.id);
    const newIndex = sections.indexOf(over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const reorderedSections = arrayMove(sections, oldIndex, newIndex);
    setStoredSections(reorderedSections);
  };

  return (
    <div className="card-base p-6">
      <div className="mb-5">
        <h2 className="section-title">CV Section Order</h2>
        <p className="section-subtitle mt-1">
          Reorder your resume sections to match your career story and highlight
          what matters most.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <SortableSectionItem key={section} id={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragDropSections;