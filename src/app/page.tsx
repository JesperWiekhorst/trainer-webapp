'use client';

import { useState } from 'react';
import { DrillForm, Drill } from '../components/DrillForm';
import { DrillList } from '../components/DrillList';

const Home = () => {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);

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
  };

  const handleSelectDrill = (drill: Drill) => {
    setSelectedDrill(drill);
  };

  const handleClearSelection = () => {
    setSelectedDrill(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Training Drill Manager
          </h1>
          <p className="text-gray-600">
            Create and manage training drills for your team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Drill Form */}
          <div>
            <DrillForm
              selectedDrill={selectedDrill}
              onSave={handleSaveDrill}
              onClear={handleClearSelection}
            />
          </div>

          {/* Drill List */}
          <div>
            <DrillList
              drills={drills}
              selectedDrill={selectedDrill}
              onSelectDrill={handleSelectDrill}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
