import { Drill } from './DrillForm';
import { FILTERS, FilterOption, getFilterOptionColors, sortFilterOptions } from '../types/filters';

interface DrillListProps {
  drills: Drill[];
  onEditDrill: (drill: Drill) => void;
  totalDrillCount?: number; // Total number of drills before filtering
}

export const DrillList = ({ drills, onEditDrill, totalDrillCount }: DrillListProps) => {
  // Helper function to get filter option by ID
  const getFilterOptionById = (optionId: string): FilterOption | null => {
    for (const filter of FILTERS) {
      const option = filter.options.find(opt => opt.id === optionId);
      if (option) return option;
    }
    return null;
  };

  // Show different empty states based on context
  if (drills.length === 0) {
    const isFiltered = totalDrillCount && totalDrillCount > 0;
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {isFiltered ? (
              // Filter icon for "no results" state
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
            ) : (
              // Drill icon for "no drills" state
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h4.5m0 0H18c1.68 0 3-1.4 3-3.12V5.88C21 4.4 19.68 3 18 3H6c-1.68 0-3 1.4-3 3.12v3c0 1.72 1.32 3.12 3 3.12h4.5zm0 0v6" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isFiltered ? 'No matching drills' : 'No drills yet'}
          </h3>
          <p className="text-gray-500">
            {isFiltered 
              ? 'Try adjusting your filters to see more drills'
              : 'Create your first training drill to get started'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {drills.map((drill) => (
        <div
          key={drill.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {/* Drill title */}
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {drill.title}
              </h3>
              
              {/* Description preview */}
              {drill.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {drill.description.length > 150
                    ? `${drill.description.substring(0, 150)}...`
                    : drill.description}
                </p>
              )}
              
              {/* Filter options with category-specific colors in consistent order */}
              {drill.filterOptions && drill.filterOptions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {sortFilterOptions(drill.filterOptions).map((optionId) => {
                    const option = getFilterOptionById(optionId);
                    if (!option) return null;
                    
                    const colorClasses = getFilterOptionColors(optionId);
                    
                    return (
                      <span
                        key={optionId}
                        className={`inline-block px-2 py-1 text-xs rounded-md font-medium ${colorClasses}`}
                      >
                        {option.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Edit button */}
            <button
              onClick={() => onEditDrill(drill)}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
              aria-label={`Edit ${drill.title}`}
              title="Edit drill"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-5.5-5.5l3.5-3.5a2.121 2.121 0 113 3l-3.5 3.5M11 4L7 8" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 