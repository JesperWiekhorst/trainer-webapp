import { Drill } from '../components/DrillForm';

/**
 * Filters drills based on selected filter options
 * 
 * Logic:
 * - OR within a filter category: drill matches if it has ANY of the selected options from that category
 * - AND between filter categories: drill must match at least one option from EACH active category
 * 
 * @param drills - Array of drills to filter
 * @param activeFilters - Object mapping filter category IDs to arrays of selected option IDs
 * @returns Filtered array of drills
 */
export const filterDrills = (
  drills: Drill[], 
  activeFilters: Record<string, string[]>
): Drill[] => {
  // If no filters are active, return all drills
  const activeFilterEntries = Object.entries(activeFilters).filter(([_, options]) => options.length > 0);
  
  if (activeFilterEntries.length === 0) {
    return drills;
  }

  return drills.filter(drill => {
    // For each active filter category, check if drill matches at least one option (OR logic within category)
    return activeFilterEntries.every(([filterId, selectedOptions]) => {
      // Check if the drill has any of the selected options from this filter category
      return selectedOptions.some(optionId => drill.filterOptions.includes(optionId));
    });
  });
}; 