import { useState } from 'react';
import './styles/global.css';
import { TimeSlot } from './types/time';
import DraggableSelector from './components/DraggableSelector';

function TimeSelector() {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  const [count, setCount] = useState(11);
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

  const [mode, setMode] = useState<'day' | 'date'>('date');

  return (
    <>
      <button onClick={erase}>지우기</button>
      <button onClick={click}>더하기</button>
      <button
        onClick={() => {
          setMode('day');
        }}
      >
        day
      </button>
      <button
        onClick={() => {
          setMode('date');
        }}
      >
        date
      </button>
      <DraggableSelector
        startTime={'09:30'}
        endTime={'15:00'}
        dates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
        // timeUnit={30}
        // slotRowGap={'2px'}
        // slotColumnGap={'2px'}
        // slotHeight={'30px'}
        // slotMinWidth={'60px'}
        // hoveredSlotColor={'#023020'}
        // selectedSlotColor={'#000'}
        // defaultSlotColor={'#d77373'}
        // slotBorderStyle={'1px solid #000'}
        // slotBorderRadius={'3px'}
        // rowLabelWidth={'100px'}
        // width={'100%'}
        // height={'auto'}
        // isRowLabelInvisible={false}
        // isColumnLabelInVisible={false}
        mode={mode}
        // language={'en'}
      />
    </>
  );
}

export default TimeSelector;
