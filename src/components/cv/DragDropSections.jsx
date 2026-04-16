
import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const defaultSections = [
  'summary',
  'experience',
  'education',
  'skills',
  'languages',
];

const SortableSectionItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const label = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="text-slate-400">
          <GripVertical size={18} />
        </span>
        <span className="text-sm font-medium text-slate-800">{label}</span>
      </div>

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        Drag
      </button>
    </div>
  );
};

const DragDropSections = () => {
  const [sections, setSections] = useLocalStorage('cvSections', defaultSections);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
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

    setSections((prevSections) => arrayMove(prevSections, oldIndex, newIndex));
  };

  return (
    <div className="card-base p-6">
      <div className="mb-4">
        <h2 className="section-title">CV Section Order</h2>
        <p className="section-subtitle mt-1">
          Drag and reorder the sections of your CV.
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