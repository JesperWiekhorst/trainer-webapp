import { useState, useEffect } from 'react';
import { FilterSelector } from './FilterSelector';

interface Drill {
  id: string;
  title: string;
  description: string;
  filterOptions: string[]; // Array of selected filter option IDs
}

interface DrillFormProps {
  selectedDrill: Drill | null;
  onSave: (drill: Omit<Drill, 'id'>) => void;
  onClear: () => void;
}

const DrillForm = ({ selectedDrill, onSave, onClear }: DrillFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDrill) {
      setTitle(selectedDrill.title);
      setDescription(selectedDrill.description);
      setSelectedFilterOptions(selectedDrill.filterOptions || []);
    }
  }, [selectedDrill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      filterOptions: selectedFilterOptions,
    });

    // Clear form after save
    setTitle('');
    setDescription('');
    setSelectedFilterOptions([]);
    onClear();
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setSelectedFilterOptions([]);
    onClear();
  };

  const handleFilterToggle = (optionId: string) => {
    setSelectedFilterOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId) // Remove if already selected
        : [...prev, optionId] // Add if not selected
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedDrill ? 'Edit Drill' : 'Create New Drill'}
        </h2>
        {selectedDrill && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Drill Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter drill title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the drill, setup, and instructions..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
          />
        </div>

        {/* Filter Selection */}
        <FilterSelector
          selectedFilterOptions={selectedFilterOptions}
          onFilterToggle={handleFilterToggle}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
        >
          {selectedDrill ? 'Update Drill' : 'Save Drill'}
        </button>
      </form>
    </div>
  );
};

export { DrillForm };
export type { Drill }; 