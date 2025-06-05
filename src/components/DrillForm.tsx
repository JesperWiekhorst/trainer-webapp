import { useState, useEffect } from 'react';
import { FilterSelector } from './FilterSelector';

interface Drill {
  id: string;
  filterOptions: string[]; // Array of selected filter option IDs
  // German fields
  name: string; // Drill title
  beschreibung: string; // General description
  aufbau: string; // Setup description
  aufgabe: string; // Player tasks
  korrekturen: string; // Coaching tips and corrections
}

interface DrillFormProps {
  selectedDrill: Drill | null;
  onSave: (drill: Omit<Drill, 'id'>) => void;
  onClear: () => void;
}

const DrillForm = ({ selectedDrill, onSave, onClear }: DrillFormProps) => {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);
  // German fields state
  const [name, setName] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [aufbau, setAufbau] = useState('');
  const [aufgabe, setAufgabe] = useState('');
  const [korrekturen, setKorrekturen] = useState('');

  useEffect(() => {
    if (selectedDrill) {
      setSelectedFilterOptions(selectedDrill.filterOptions || []);
      setName(selectedDrill.name || '');
      setBeschreibung(selectedDrill.beschreibung || '');
      setAufbau(selectedDrill.aufbau || '');
      setAufgabe(selectedDrill.aufgabe || '');
      setKorrekturen(selectedDrill.korrekturen || '');
    }
  }, [selectedDrill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return;
    }

    onSave({
      filterOptions: selectedFilterOptions,
      name: name.trim(),
      beschreibung: beschreibung.trim(),
      aufbau: aufbau.trim(),
      aufgabe: aufgabe.trim(),
      korrekturen: korrekturen.trim(),
    });

    // Clear form after save
    setSelectedFilterOptions([]);
    setName('');
    setBeschreibung('');
    setAufbau('');
    setAufgabe('');
    setKorrekturen('');
    onClear();
  };

  const handleClear = () => {
    setSelectedFilterOptions([]);
    setName('');
    setBeschreibung('');
    setAufbau('');
    setAufgabe('');
    setKorrekturen('');
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Drill-Titel eingeben..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="beschreibung" className="block text-sm font-medium text-gray-700 mb-1">
            Beschreibung
          </label>
          <textarea
            id="beschreibung"
            value={beschreibung}
            onChange={(e) => setBeschreibung(e.target.value)}
            placeholder="Allgemeine Beschreibung der Übung..."
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