import { useState } from 'react';

import './styles/global.css';
import { TimeSlot } from './types/time';
import DraggableSelector from './components/DraggableSelector';

/*
interface DraggableSelectorProps {
  // REQUIRED
  startTime: string;
  endTime: string;
  selectedDates: Date[];
  selectedTimeSlots: TimeSlot[];
  setSelectedTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;

  // OPTIONAL
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
 */

function TimeSelector() {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    // new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  const [count, setCount] = useState(6);
  const click = () => {
    setSelectedDates(prev => {
      const next = [...prev];
      next.push(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + count,
        ),
      );
      return next;
    });
    setCount(count + 1);
  };

  const erase = () => {
    setSelectedDates(prev => {
      const next = [...prev];
      next.pop();
      return next;
    });
    setCount(count - 1);
  };

  return (
    <>
      <button onClick={erase}>지우기</button>
      <button onClick={click}>버튼버튼</button>
      <DraggableSelector
        startTime={'09:30'}
        endTime={'15:00'}
        selectedDates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
        timeUnit={30}
        slotRowGap={2}
        slotColumnGap={2}
        slotHeight={20}
        slotMinWidth={30}
      />
    </>
  );
}

export default TimeSelector;
