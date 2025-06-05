import { Drill } from '../components/DrillForm';

// Mock data for development - converted to our Drill interface format
export const MOCK_DRILLS: Drill[] = [
  {
    id: "1",
    filterOptions: ["erwaermung", "tempo", "e-jugend", "5-10"],
    name: "Dribbel-Parcours",
    beschreibung: "Ein vielseitiger Parcours zur Verbesserung der Dribbeltechnik und Ballkontrolle. Ideal für die Erwärmung und Technikschulung.",
    aufbau: "6-8 Hütchen in verschiedenen Abständen aufstellen. 4 Bälle bereitlegen. Parcours in 20x10m Feld markieren.",
    aufgabe: "Spieler dribbeln nacheinander durch den Parcours. Verschiedene Dribbeltechniken verwenden: rechts, links, beide Füße.",
    korrekturen: "Ball nah am Fuß führen. Kopf hoch beim Dribbeln. Tempo variieren je nach Schwierigkeitsgrad."
  },
  {
    id: "2",
    filterOptions: ["grunduebung", "1vs1", "abwehr", "d-jugend", "unter-5"],
    name: "1vs1 auf kleinem Feld",
    beschreibung: "Intensive Zweikampfschulung zur Verbesserung der individuellen Abwehr- und Angriffstechniken.",
    aufbau: "Kleines Feld 15x10m mit 2 Mini-Toren. Mittellinie markieren. 2 Teams bilden.",
    aufgabe: "Ein Spieler startet mit Ball, Gegner versucht zu verteidigen. Ziel: Tor erzielen oder Ball erobern.",
    korrekturen: "Verteidiger: seitlich zum Angreifer stehen, nicht frontal. Angreifer: Tempo variieren, Finten einsetzen."
  },
  {
    id: "3",
    filterOptions: ["grundspiel", "tempo", "spielaufbau", "c-jugend", "10-12"],
    name: "Schnelles Umschaltspiel",
    beschreibung: "Trainiert die mentale und körperliche Schnelligkeit beim Wechsel zwischen Offensiv- und Defensivverhalten.",
    aufbau: "Feld 30x20m, 2 Tore, 2 Teams à 4-5 Spieler. Neutrale Spieler an den Seitenlinien.",
    aufgabe: "Normales Spiel, aber bei Ballverlust sofort umschalten. Verlorener Ball muss schnell zurückerobert werden.",
    korrekturen: "Sofortige Reaktion nach Ballverlust. Kompakte Defensive. Schneller erster Pass nach Ballgewinn."
  },
  {
    id: "4",
    filterOptions: ["grunduebung", "wurf", "b-jugend", "5-10"],
    name: "Wurftraining mit Torhüter",
    beschreibung: "Systematisches Wurftraining zur Verbesserung der Präzision und Durchschlagskraft bei Torschüssen.",
    aufbau: "Tor mit Torhüter, Markierungen für verschiedene Wurfzonen. Bälle in 16m-Raum verteilen.",
    aufgabe: "Spieler werfen aus verschiedenen Positionen und Entfernungen. Zielzonen systematisch abarbeiten.",
    korrekturen: "Stand- und Sprungwurf technisch sauber ausführen. Torhüter-Position beobachten. Kraft aus den Beinen."
  },
  {
    id: "5",
    filterOptions: ["zielspiel", "spielaufbau", "a-jugend", "10-16"],
    name: "Kleines Abschlussspiel",
    beschreibung: "Spielnahe Übungsform zum Abschluss der Trainingseinheit mit hohem Spaßfaktor.",
    aufbau: "Kleines Feld 25x15m, 2 kleine Tore oder Hütchentore. Teams gleichmäßig aufteilen.",
    aufgabe: "Freies Spiel mit wenigen Regeln. Viele Ballkontakte für alle Spieler. Tempo selbst bestimmen.",
    korrekturen: "Alle Spieler aktiv einbeziehen. Fair play fördern. Bei Übermotivation beruhigend einwirken."
  },
  {
    id: "6",
    filterOptions: ["erwaermung", "tempo", "wurf", "senioren", "16-plus"],
    name: "Passparcours Senioren",
    beschreibung: "Technisch anspruchsvoller Passparcours für erfahrene Spieler mit Fokus auf Präzision unter Zeitdruck.",
    aufbau: "Stationen im Halbfeld aufbauen. Pro Station 2-3 Spieler. Rotation alle 3 Minuten.",
    aufgabe: "Präzise Pässe unter Zeitdruck spielen. Verschiedene Passtechniken anwenden: kurz, lang, hoch, flach.",
    korrekturen: "Körperhaltung vor dem Pass. Zielen vor dem Abspiel. Passtempo an Situation anpassen."
  }
]; 