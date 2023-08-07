import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimeSelectorProps {
  endTime: string;
  startTime: string;
  setEndTime: (time: string) => void;
  setStartTime: (time: string) => void;
  timeUnit: 5 | 10 | 15 | 20 | 30 | 60;
}

function TimeSelector({
  timeUnit,
  endTime,
  startTime,
  setEndTime,
  setStartTime,
}: TimeSelectorProps) {
  const [endTimes, setEndTimes] = useState<string[]>([]);
  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);

  const generateTimes = useCallback(() => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += timeUnit) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  }, [timeUnit]);

  const handleStartTimeChange = useCallback(
    (time: string) => {
      setStartTime(time);
      const filteredEndTimes = startTimes.filter(t => t > time);
      setEndTimes(filteredEndTimes);
      setEndTime(filteredEndTimes[0]);
      setIsStartTimeOpen(false);
      setIsStartTimeOpen(false);
    },
    [startTimes, timeUnit, setIsStartTimeOpen],
  );

  const handleEndTimeChange = useCallback(
    (time: string) => {
      setEndTime(time);
      setIsEndTimeOpen(false);
    },
    [timeUnit],
  );

  useEffect(() => {
    const times = generateTimes();
    setStartTimes(times);
    setEndTimes(times.filter(t => t > startTime));
  }, [timeUnit, startTime, startTimes.length]);

  useEffect(() => {
    setStartTime('11:00');
    setEndTime('18:30');
    setIsEndTimeOpen(false);
    setIsStartTimeOpen(false);
  }, [timeUnit]);

  return (
    <TimeSelectorContainer>
      <label>Start</label>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}>
          {startTime}
        </DropdownButton>
        {isStartTimeOpen && (
          <DropdownList>
            {startTimes.map((time, index) => (
              <DropdownListItem
                key={index}
                onClick={() => handleStartTimeChange(time)}
              >
                {time}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>

      <label>End</label>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}>
          {endTime}
        </DropdownButton>
        {isEndTimeOpen && (
          <DropdownList>
            {endTimes.map((time, index) => (
              <DropdownListItem
                key={index}
                onClick={() => handleEndTimeChange(time)}
              >
                {time}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </TimeSelectorContainer>
  );
}

export default TimeSelector;

// style
const TimeSelectorContainer = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`;

const DropdownContainer = styled.div`
  width: 120px;
  font-size: 14px;
  position: relative;
  margin-left: 6px;
  margin-right: 10px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 8px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  background-color: #eeeeee;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DropdownList = styled.ul`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  left: 0;
  top: 100%;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  overflow: auto;
  list-style: none;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
