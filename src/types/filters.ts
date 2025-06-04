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