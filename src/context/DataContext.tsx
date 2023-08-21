import React, { createContext, useContext, useState } from 'react';
import { TimeSlot } from '../types/time';
import { DragEventStates } from '../types/event';
import { initialData, DataContextType } from './DataContextData';

const DataContext = createContext<DataContextType>(initialData);

function DataProvider({ children }: { children: React.ReactNode }) {
  const [selectedDates, setSelectedDates] = useState<Date[]>(initialData.selectedDates);
  const [dragEventStates, setDragEventStates] = useState<DragEventStates>(initialData.dragEventStates);

  const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>(initialData.timeSlotMatrix);
  const [mockTimeSlotMatrix, setMockTimeSlotMatrix] = useState<TimeSlot[][]>(initialData.mockTimeSlotMatrix);
  const [timeSlotMatrixByDay, setTimeSlotMatrixByDay] = useState<TimeSlot[][]>(initialData.timeSlotMatrixByDay);

  return (
    <DataContext.Provider
      value={{
        selectedDates,
        setSelectedDates,
        dragEventStates,
        setDragEventStates,
        timeSlotMatrix,
        setTimeSlotMatrix,
        mockTimeSlotMatrix,
        setMockTimeSlotMatrix,
        timeSlotMatrixByDay,
        setTimeSlotMatrixByDay,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
