import { useState } from 'react';
import { FILTERS, FilterOption, getFilterOptionColors, sortFilterOptions } from '../types/filters';

interface FilterSelectorProps {
  selectedFilterOptions: string[];
  onFilterToggle: (optionId: string) => void;
  mode?: 'expanded' | 'dropdown'; // New prop to control display mode
  title?: string; // Optional title for the section
}

export const FilterSelector = ({ 
  selectedFilterOptions, 
  onFilterToggle, 
  mode = 'expanded',
  title = 'Filter'
}: FilterSelectorProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Helper function to get filter option by ID
  const getFilterOptionById = (optionId: string): FilterOption | null => {
    for (const filter of FILTERS) {
      const option = filter.options.find(opt => opt.id === optionId);
      if (option) return option;
    }
    return null;
  };

  // Convert selectedFilterOptions array to activeFilters object for dropdown mode
  const getActiveFilters = (): Record<string, string[]> => {
    const activeFilters: Record<string, string[]> = {};
    
    selectedFilterOptions.forEach(optionId => {
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

  const activeFilters = getActiveFilters();
  const hasActiveFilters = selectedFilterOptions.length > 0;

  // Clear all filters
  const handleClearAll = () => {
    selectedFilterOptions.forEach(optionId => {
      onFilterToggle(optionId); // Remove each selected filter
    });
  };

  // Dropdown mode UI
  if (mode === 'dropdown') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTERS.map((filter) => {
            const selectedCount = activeFilters[filter.id]?.length || 0;
            const isOpen = openDropdown === filter.id;
            
            return (
              <div key={filter.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(isOpen ? null : filter.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                    selectedCount > 0
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {filter.name}
                  {selectedCount > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                      {selectedCount}
                    </span>
                  )}
                  <svg 
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2 space-y-1">
                      {filter.options.map((option) => {
                        const isSelected = selectedFilterOptions.includes(option.id);
                        const colorClasses = getFilterOptionColors(option.id);
                        
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => onFilterToggle(option.id)}
                            className={`w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                              isSelected
                                ? `${colorClasses} border border-current`
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Clear All Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Selected Filter Tags */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-3">
            <div className="text-xs text-gray-600 mb-2">Active filters:</div>
            <div className="flex flex-wrap gap-1">
              {sortFilterOptions(selectedFilterOptions).map((optionId) => {
                const option = getFilterOptionById(optionId);
                if (!option) return null;
                
                const colorClasses = getFilterOptionColors(optionId);
                
                return (
                  <button
                    key={optionId}
                    type="button"
                    onClick={() => onFilterToggle(optionId)}
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:opacity-80 transition-opacity ${colorClasses}`}
                  >
                    {option.label}
                    <span className="hover:text-current">×</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Click outside to close dropdown */}
        {openDropdown && (
          <div 
            className="fixed inset-0 z-0" 
            onClick={() => setOpenDropdown(null)}
          />
        )}
      </div>
    );
  }

  // Expanded mode UI (original design for modal)
  return (
    <div className="space-y-4">
      {/* Filter section heading */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">{title}</h3>
      </div>
      
      {/* Selected filters display in consistent order */}
      {hasActiveFilters && (
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-2">Ausgewählt:</div>
          <div className="flex flex-wrap gap-1">
            {sortFilterOptions(selectedFilterOptions).map((optionId) => {
              const option = getFilterOptionById(optionId);
              if (!option) return null;
              
              const colorClasses = getFilterOptionColors(optionId);
              
              return (
                <button
                  key={optionId}
                  type="button"
                  onClick={() => onFilterToggle(optionId)}
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md hover:opacity-80 transition-opacity ${colorClasses}`}
                >
                  {option.label}
                  <span className="hover:text-current">×</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter categories */}
      <div className="space-y-3">
        {FILTERS.map((filter) => {
          return (
            <div key={filter.id}>
              <div className="text-sm font-medium text-gray-700 mb-1">
                {filter.name}
              </div>
              <div className="flex flex-wrap gap-1">
                {filter.options.map((option) => {
                  const isSelected = selectedFilterOptions.includes(option.id);
                  const colorClasses = getFilterOptionColors(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onFilterToggle(option.id)}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                        isSelected
                          ? `${colorClasses} border-current`
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 