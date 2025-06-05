import { useState, useEffect } from 'react';
import { Drill } from './DrillForm';
import { FilterSelector } from './FilterSelector';

interface DrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDrill: Drill | null;
  onSave: (drill: Omit<Drill, 'id'>) => void;
}

export const DrillModal = ({ isOpen, onClose, selectedDrill, onSave }: DrillModalProps) => {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);
  // German fields state
  const [name, setName] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [aufbau, setAufbau] = useState('');
  const [aufgabe, setAufgabe] = useState('');
  const [korrekturen, setKorrekturen] = useState('');

  // Reset form when modal opens/closes or when selectedDrill changes
  useEffect(() => {
    if (isOpen) {
      if (selectedDrill) {
        // Pre-fill form with selected drill data for editing
        setSelectedFilterOptions(selectedDrill.filterOptions || []);
        setName(selectedDrill.name || '');
        setBeschreibung(selectedDrill.beschreibung || '');
        setAufbau(selectedDrill.aufbau || '');
        setAufgabe(selectedDrill.aufgabe || '');
        setKorrekturen(selectedDrill.korrekturen || '');
      } else {
        // Clear form for new drill creation
        setSelectedFilterOptions([]);
        setName('');
        setBeschreibung('');
        setAufbau('');
        setAufgabe('');
        setKorrekturen('');
      }
    }
  }, [isOpen, selectedDrill]);

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

    // Close modal after save
    onClose();
  };

  const handleFilterToggle = (optionId: string) => {
    setSelectedFilterOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId) // Remove if already selected
        : [...prev, optionId] // Add if not selected
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedDrill ? 'Edit Drill' : 'Create New Drill'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              />
            </div>

            <div>
              <label htmlFor="aufbau" className="block text-sm font-medium text-gray-700 mb-1">
                Aufbau
              </label>
              <textarea
                id="aufbau"
                value={aufbau}
                onChange={(e) => setAufbau(e.target.value)}
                placeholder="Beschreibung des Aufbaus (Ausrüstung, Platz, etc.)..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              />
            </div>

            <div>
              <label htmlFor="aufgabe" className="block text-sm font-medium text-gray-700 mb-1">
                Aufgabe
              </label>
              <textarea
                id="aufgabe"
                value={aufgabe}
                onChange={(e) => setAufgabe(e.target.value)}
                placeholder="Was sollen die Spieler bei dieser Übung tun..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              />
            </div>

            <div>
              <label htmlFor="korrekturen" className="block text-sm font-medium text-gray-700 mb-1">
                Korrekturen
              </label>
              <textarea
                id="korrekturen"
                value={korrekturen}
                onChange={(e) => setKorrekturen(e.target.value)}
                placeholder="Trainings-Tipps und häufige Korrekturen..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              />
            </div>

            {/* Filter Selection */}
            <FilterSelector
              selectedFilterOptions={selectedFilterOptions}
              onFilterToggle={handleFilterToggle}
            />

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                {selectedDrill ? 'Update Drill' : 'Save Drill'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 