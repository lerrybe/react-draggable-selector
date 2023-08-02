import { useState } from 'react';

import './styles/global.css';
import { Time, TimeSlot } from './types/time';
import DraggableSelector from './components/DraggableSelector';

function TimeSelector() {
  const [selectedTime] = useState<Time>({
    startTime: '10:00',
    endTime: '15:30',
  });
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
        selectedTime={selectedTime}
        selectedDates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
    </>
  );
}

export default TimeSelector;
