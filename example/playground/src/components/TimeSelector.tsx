import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface TimeSelectorProps {
  minTime: string;
  maxTime: string;
  setMinTime: (time: string) => void;
  setMaxTime: (time: string) => void;
}

function TimeSelector({ minTime, maxTime, setMaxTime, setMinTime }: TimeSelectorProps) {
  const [minTimes, setMinTimes] = useState<string[]>([]);
  const [maxTimes, setMaxTimes] = useState<string[]>([]);
  const [isMinTimeOpen, setIsMinTimeOpen] = useState(false);
  const [isMaxTimeOpen, setIsMaxTimeOpen] = useState(false);

  const generateTimes = useCallback(() => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  }, []);

  const handleMinTimeChange = useCallback(
    (time: string) => {
      setMinTime(time);
      const filteredMaxTimes = minTimes.filter(t => t > time);
      setMaxTimes(filteredMaxTimes);
      setMaxTime(filteredMaxTimes[0]);
      setIsMinTimeOpen(false);
    },
    [minTimes, setMaxTime, setMinTime],
  );

  const handleMaxTimeChange = useCallback(
    (time: string) => {
      setMaxTime(time);
      setIsMinTimeOpen(false);
      setIsMaxTimeOpen(false);
    },
    [setMaxTime],
  );

  useEffect(() => {
    const times = generateTimes();
    setMinTimes(times);
    setMaxTimes(times.filter(t => t > minTime));
  }, [generateTimes, maxTime, maxTimes.length, minTime]);

  useEffect(() => {
    setMinTime('11:00');
    setMaxTime('19:00');
    setIsMaxTimeOpen(false);
    setIsMinTimeOpen(false);
  }, [setMaxTime, setMinTime]);

  return (
    <TimeSelectorContainer>
      <label>Start</label>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsMinTimeOpen(!isMinTimeOpen)}>{minTime}</DropdownButton>
        {isMinTimeOpen && (
          <DropdownList>
            {minTimes.map((time, index) => (
              <DropdownListItem key={index} onClick={() => handleMinTimeChange(time)}>
                {time}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>

      <label>End</label>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsMaxTimeOpen(!isMaxTimeOpen)}>{maxTime}</DropdownButton>
        {isMaxTimeOpen && (
          <DropdownList>
            {maxTimes.map((time, index) => (
              <DropdownListItem key={index} onClick={() => handleMaxTimeChange(time)}>
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
