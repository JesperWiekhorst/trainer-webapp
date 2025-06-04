import { Drill } from '../components/DrillForm';

// Mock data for development - converted to our Drill interface format
export const MOCK_DRILLS: Drill[] = [
  {
    id: "1",
    title: "Dribbel-Parcours",
    description: "Die Spieler durchlaufen einen Parcours mit verschiedenen Dribbel-Stationen.",
    filterOptions: ["erwaermung", "tempo", "e-jugend", "5-10"]
  },
  {
    id: "2",
    title: "1vs1 auf kleinem Feld",
    description: "Zweikampfübung zur Verbesserung des 1vs1-Verhaltens in der Abwehr.",
    filterOptions: ["grunduebung", "1vs1", "abwehr", "d-jugend", "unter-5"]
  },
  {
    id: "3",
    title: "Schnelles Umschaltspiel",
    description: "Übung zum Trainieren von schnellen Umschaltmomenten zwischen Angriff und Abwehr.",
    filterOptions: ["grundspiel", "tempo", "spielaufbau", "c-jugend", "10-12"]
  },
  {
    id: "4",
    title: "Wurftraining mit Torhüter",
    description: "Gezieltes Wurftraining mit wechselnden Zielzonen.",
    filterOptions: ["grunduebung", "wurf", "b-jugend", "5-10"]
  },
  {
    id: "5",
    title: "Kleines Abschlussspiel",
    description: "Freies Spiel mit begrenztem Raum als Abschluss der Einheit.",
    filterOptions: ["zielspiel", "spielaufbau", "a-jugend", "10-16"]
  },
  {
    id: "6",
    title: "Passparcours Senioren",
    description: "Seniorenteam übt gezielte Pässe unter Druck im Parcours.",
    filterOptions: ["erwaermung", "tempo", "wurf", "senioren", "16-plus"]
  }
]; 