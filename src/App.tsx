import React, { useState } from 'react';

import './styles/global.css';
import { TimeSlot } from './types/time';
import DraggableSelector from './components/DraggableSelector';

interface DraggableSelectorProps {
  /* REQUIRED */
  startTime: string;
  endTime: string;
  selectedDates: Date[];
  selectedTimeSlots: TimeSlot[];
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

  /* OPTIONAL */
  mode?: 'date' | 'day'; // opt, default: 'date'
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60; // opt, default: 30
  slotWidth?: number;
  slotHeight?: number;
  defaultSlotColor?: string;
  selectedSlotColor?: string;
  hoveredSlotColor?: string;
  slotRowGap?: number;
  slotColumnGap?: number;
  slotBorderStyle?: string; // '1px solid color'

  maxWidth?: number;
  maxHeight?: number;

  columnLabelMargin?: string;
  columnLabelFontSize?: number;
  columnLabelFontFamily?: string;
  isColumnLabelVisible?: boolean;

  rowLabelMargin?: string;
  rowLabelFontSize?: number;
  rowLabelFontFamily?: string;
  isRowLabelVisible?: boolean;
}

function TimeSelector() {
  const today = new Date();
  const [selectedDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  console.log(selectedTimeSlots);

  return (
    <>
      <DraggableSelector
        startTime={'10:00'}
        endTime={'15:30'}
        selectedDates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
    </>
  );
}

export default TimeSelector;
