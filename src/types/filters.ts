// Filter types and data definitions
export interface FilterOption {
  id: string;
  label: string;
}

export interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

// Color mapping for different filter categories
export const FILTER_COLORS = {
  trainingspart: 'bg-blue-100 text-blue-800',      // Blue for training parts
  thema: 'bg-green-100 text-green-800',            // Green for themes  
  alter: 'bg-red-100 text-red-800',                // Red for age groups
  gruppengroesse: 'bg-orange-100 text-orange-800', // Orange for group sizes
} as const;

// Helper function to get color classes for a filter option
export const getFilterOptionColors = (optionId: string): string => {
  for (const filter of FILTERS) {
    const option = filter.options.find(opt => opt.id === optionId);
    if (option) {
      return FILTER_COLORS[filter.id as keyof typeof FILTER_COLORS] || 'bg-gray-100 text-gray-800';
    }
  }
  return 'bg-gray-100 text-gray-800'; // Default fallback color
};

// Helper function to sort filter options in consistent order
export const sortFilterOptions = (optionIds: string[]): string[] => {
  // Create a mapping of optionId to its position for sorting
  const orderMap = new Map<string, number>();
  let position = 0;
  
  // Assign positions based on filter and option order in FILTERS array
  for (const filter of FILTERS) {
    for (const option of filter.options) {
      orderMap.set(option.id, position);
      position++;
    }
  }
  
  // Sort the provided optionIds based on their defined order
  return optionIds.sort((a, b) => {
    const posA = orderMap.get(a) ?? 999; // Unknown options go to end
    const posB = orderMap.get(b) ?? 999;
    return posA - posB;
  });
};

// Static filter data in German
export const FILTERS: Filter[] = [
  {
    id: 'trainingspart',
    name: 'Trainingspart',
    options: [
      { id: 'erwaermung', label: 'Erwärmung' },
      { id: 'grunduebung', label: 'Grundübung' },
      { id: 'grundspiel', label: 'Grundspiel' },
      { id: 'zielspiel', label: 'Zielspiel' },
    ],
  },
  {
    id: 'thema',
    name: 'Thema',
    options: [
      { id: 'tempo', label: 'Tempo' },
      { id: 'abwehr', label: 'Abwehr' },
      { id: '1vs1', label: '1vs1' },
      { id: 'wurf', label: 'Wurf' },
      { id: 'spielaufbau', label: 'Spielaufbau' },
    ],
  },
  {
    id: 'alter',
    name: 'Alter',
    options: [
      { id: 'mini-maxi', label: 'Mini/Maxi' },
      { id: 'e-jugend', label: 'E-Jugend' },
      { id: 'd-jugend', label: 'D-Jugend' },
      { id: 'c-jugend', label: 'C-Jugend' },
      { id: 'b-jugend', label: 'B-Jugend' },
      { id: 'a-jugend', label: 'A-Jugend' },
      { id: 'senioren', label: 'Senioren' },
    ],
  },
  {
    id: 'gruppengroesse',
    name: 'Gruppengröße',
    options: [
      { id: 'unter-5', label: '<5' },
      { id: '5-10', label: '5–10' },
      { id: '10-12', label: '10–12' },
      { id: '10-16', label: '10–16' },
      { id: '16-plus', label: '16+' },
    ],
  },
]; 