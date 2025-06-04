import { Drill } from './DrillForm';
import { FILTERS, FilterOption } from '../types/filters';

interface DrillListProps {
  drills: Drill[];
  selectedDrill: Drill | null;
  onSelectDrill: (drill: Drill) => void;
}

const DrillList = ({ drills, selectedDrill, onSelectDrill }: DrillListProps) => {
  // Helper function to get filter option by ID
  const getFilterOptionById = (optionId: string): FilterOption | null => {
    for (const filter of FILTERS) {
      const option = filter.options.find(opt => opt.id === optionId);
      if (option) return option;
    }
    return null;
  };

  if (drills.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Drills</h2>
        <p className="text-gray-500 text-center py-8">
          No drills created yet. Start by creating your first drill above!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Saved Drills ({drills.length})
      </h2>
      
      <div className="space-y-2">
        {drills.map((drill) => (
          <button
            key={drill.id}
            onClick={() => onSelectDrill(drill)}
            className={`w-full text-left p-3 rounded-md border transition-colors ${
              selectedDrill?.id === drill.id
                ? 'bg-blue-50 border-blue-200 text-blue-900'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900'
            }`}
          >
            <div className="font-medium mb-1">{drill.title}</div>
            
            {drill.description && (
              <div className="text-sm text-gray-600 line-clamp-2 mb-2">
                {drill.description.length > 100
                  ? `${drill.description.substring(0, 100)}...`
                  : drill.description}
              </div>
            )}
            
            {/* Display selected filter options */}
            {drill.filterOptions && drill.filterOptions.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {drill.filterOptions.map((optionId) => {
                  const option = getFilterOptionById(optionId);
                  if (!option) return null;
                  
                  return (
                    <span
                      key={optionId}
                      className={`inline-block px-2 py-1 text-xs rounded-md ${
                        selectedDrill?.id === drill.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {option.label}
                    </span>
                  );
                })}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export { DrillList }; 