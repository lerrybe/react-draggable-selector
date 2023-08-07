import React, { useState } from 'react';

import { TimeSlot } from '../../types';
import { DraggableSelector } from '../../../main.ts';

function Introduction() {
  const today = new Date();
  const sampleDates = [
    new Date(today),
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 1}`,
    ),
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 2}`,
    ),
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 3}`,
    ),
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 4}`,
    ),
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate() + 5}`,
    ),
  ];
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <DraggableSelector
      dates={sampleDates}
      endTime={'18:00'}
      startTime={'11:00'}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
    />
  );
}

export const MemoIntroduction = React.memo(Introduction);
