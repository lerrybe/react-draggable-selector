import { useState } from 'react';
import styled from 'styled-components';

type TimeUnit = 5 | 10 | 15 | 20 | 30 | 60;

interface TimeUnitSelectorProps {
  timeUnit: TimeUnit;
  setTimeUnit: (timeUnit: TimeUnit) => void;
}

function TimeUnitSelector({ timeUnit, setTimeUnit }: TimeUnitSelectorProps) {
  const timeUnits: TimeUnit[] = [5, 10, 15, 20, 30, 60];
  const [isTimeUnitOpen, setIsTimeUnitOpen] = useState(false);

  return (
    <TimeUnitSelectorContainer>
      <label>Time Unit</label>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsTimeUnitOpen(!isTimeUnitOpen)}>
          {timeUnit}
        </DropdownButton>
        {isTimeUnitOpen && (
          <DropdownList>
            {timeUnits.map((unit: TimeUnit) => {
              return (
                <DropdownListItem
                  key={unit}
                  onClick={() => {
                    setTimeUnit(unit);
                    setIsTimeUnitOpen(false);
                  }}
                >
                  {unit}
                </DropdownListItem>
              );
            })}
          </DropdownList>
        )}
      </DropdownContainer>
      <label>min</label>
    </TimeUnitSelectorContainer>
  );
}

export default TimeUnitSelector;

// style
const TimeUnitSelectorContainer = styled.div`
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
  z-index: 12;
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
  padding: 8px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
