import { FILTERS, FilterOption } from '../types/filters';

interface FilterSelectorProps {
  selectedFilterOptions: string[];
  onFilterToggle: (optionId: string) => void;
}

const FilterSelector = ({ selectedFilterOptions, onFilterToggle }: FilterSelectorProps) => {
  // Helper function to get filter option by ID
  const getFilterOptionById = (optionId: string): FilterOption | null => {
    for (const filter of FILTERS) {
      const option = filter.options.find(opt => opt.id === optionId);
      if (option) return option;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Filter section heading */}
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-3">Filter</h3>
      </div>
      
      {/* Selected filters display */}
      {selectedFilterOptions.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-2">Ausgewählt:</div>
          <div className="flex flex-wrap gap-1">
            {selectedFilterOptions.map((optionId) => {
              const option = getFilterOptionById(optionId);
              if (!option) return null;
              
              return (
                <button
                  key={optionId}
                  type="button"
                  onClick={() => onFilterToggle(optionId)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md hover:bg-blue-200 transition-colors"
                >
                  {option.label}
                  <span className="text-blue-600 hover:text-blue-800">×</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter categories */}
      <div className="space-y-3">
        {FILTERS.map((filter) => (
          <div key={filter.id}>
            <div className="text-sm font-medium text-gray-700 mb-1">
              {filter.name}
            </div>
            <div className="flex flex-wrap gap-1">
              {filter.options.map((option) => {
                const isSelected = selectedFilterOptions.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onFilterToggle(option.id)}
                    className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                      isSelected
                        ? 'bg-blue-50 border-blue-200 text-blue-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FilterSelector }; 