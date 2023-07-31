import { useState } from "react";
import { Time, TimeSlot } from "./types/time";
import DraggableSelector from "./components/DraggableSelector";

function App() {
  const [selectedTime] = useState<Time>({
    startTime: "13:00",
    endTime: "17:00",
  });
  const today = new Date();
  const [selectedDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <>
      <DraggableSelector
        selectedTime={selectedTime}
        selectedDates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
      <div>
        {selectedTimeSlots.length > 0 ? (
          <>
            <div>{"선택된 날짜들"}</div>
            {selectedTimeSlots?.map((item) => {
              return (
                <div key={item.startTime}>
                  <h3>{`${item.date} / ${item.startTime} ~ ${item.endTime}`}</h3>
                </div>
              );
            })}
          </>
        ) : (
          <div>가능한 시간을 선택해주세요!</div>
        )}
      </div>
    </>
  );
}

export default App;
