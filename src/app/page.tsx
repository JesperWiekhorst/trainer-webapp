'use client';

import { useState } from 'react';
import { Drill } from '../components/DrillForm';
import { DrillList } from '../components/DrillList';
import { DrillModal } from '../components/DrillModal';
import { FilterSelector } from '../components/FilterSelector';
import { MOCK_DRILLS } from '../data/mockDrills';
import { filterDrills } from '../utils/drillFiltering';
import { FILTERS } from '../types/filters';

const Home = () => {
  // Initialize with mock data for development - resets on every reload
  const [drills, setDrills] = useState<Drill[]>(MOCK_DRILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [activeFilterOptions, setActiveFilterOptions] = useState<string[]>([]);

  // Convert activeFilterOptions array to activeFilters object for filtering
  const getActiveFilters = (): Record<string, string[]> => {
    const activeFilters: Record<string, string[]> = {};
    
    activeFilterOptions.forEach(optionId => {
      // Find which filter category this option belongs to using FILTERS constant
      for (const filter of FILTERS) {
        if (filter.options.find(opt => opt.id === optionId)) {
          if (!activeFilters[filter.id]) {
            activeFilters[filter.id] = [];
          }
          activeFilters[filter.id].push(optionId);
          break;
        }
      }
    });
    
    return activeFilters;
  };

  // Filter drills based on active filters
  const filteredDrills = filterDrills(drills, getActiveFilters());

  const handleSaveDrill = (drillData: Omit<Drill, 'id'>) => {
    if (selectedDrill) {
      // Update existing drill
      setDrills(drills.map(drill => 
        drill.id === selectedDrill.id 
          ? { ...drill, ...drillData }
          : drill
      ));
    } else {
      // Create new drill
      const newDrill: Drill = {
        id: Date.now().toString(),
        ...drillData,
      };
      setDrills([...drills, newDrill]);
    }
    // Reset selected drill after save
    setSelectedDrill(null);
  };

  const handleEditDrill = (drill: Drill) => {
    setSelectedDrill(drill);
    setIsModalOpen(true);
  };

  const handleNewDrill = () => {
    setSelectedDrill(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDrill(null);
  };

  const handleFilterToggle = (optionId: string) => {
    setActiveFilterOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId) // Remove if already selected
        : [...prev, optionId] // Add if not selected
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Training Drill Manager
            </h1>
            <p className="text-gray-600">
              Create and manage training drills for your team
            </p>
          </div>
          
          {/* New Drill Button */}
          <button
            onClick={handleNewDrill}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Drill
          </button>
        </div>

        {/* Filter Bar using unified FilterSelector component */}
        <FilterSelector
          mode="dropdown"
          selectedFilterOptions={activeFilterOptions}
          onFilterToggle={handleFilterToggle}
          title="Filter Drills"
        />

        {/* Drill count and main content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Saved Drills {filteredDrills.length > 0 && (
              <span className="text-gray-500 font-normal">
                ({filteredDrills.length}{drills.length !== filteredDrills.length && ` of ${drills.length}`})
              </span>
            )}
          </h2>
        </div>

        {/* Main content - Drill List */}
        <DrillList
          drills={filteredDrills}
          onEditDrill={handleEditDrill}
          totalDrillCount={drills.length}
        />

        {/* Modal for creating/editing drills */}
        <DrillModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDrill={selectedDrill}
          onSave={handleSaveDrill}
        />
      </div>
    </div>
  );
};

export default Home;
