import { useState } from 'react';
import styled from 'styled-components';

import { TimeSlot } from '../types';
import { sampleDates } from '../data/options.ts';

import Calendar from './Calendar.tsx';
import TimeSelector from './TimeSelector.tsx';
import { DraggableSelector } from '../../main.ts';
import TimeUnitSelector from './TimeUnitSelector.tsx';

function Playground() {
  type TimeUnit = 5 | 10 | 15 | 20 | 30 | 60;
  const [lang, setLang] = useState<'en' | 'ko'>('en');
  const [mode, setMode] = useState<'day' | 'date'>('date');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [startTime, setStartTime] = useState<string>('11:00');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(30);
  const [selectedDates, setSelectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <OuterContainer>
      <SelectorWrapper>
        <Mode>{`${mode} ver.`}</Mode>
        <DraggableSelector
          mode={mode}
          language={lang}
          endTime={endTime}
          timeUnit={timeUnit}
          startTime={startTime}
          dates={selectedDates}
          selectedTimeSlots={selectedTimeSlots}
          setSelectedTimeSlots={setSelectedTimeSlots}
          width={'500px'}
          height={'540px'}
          maxHeight={'540px'}
          minWidth={'320px'}
          minHeight={'300px'}
        />
      </SelectorWrapper>

      <ControlContainer>
        <ControlTitle>{`* Control Examples`}</ControlTitle>
        <div>
          <ButtonContainer>
            <Button
              onClick={() => {
                setMode('date');
              }}
            >
              DATE ver.
            </Button>
            <Button
              onClick={() => {
                setMode('day');
              }}
            >
              DAY ver.
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              onClick={() => {
                setLang('ko');
              }}
            >
              KOREAN ver.
            </Button>
            <Button
              onClick={() => {
                setLang('en');
              }}
            >
              ENGLISH ver.
            </Button>
          </ButtonContainer>
        </div>
        <TimeUnitSelector timeUnit={timeUnit} setTimeUnit={setTimeUnit} />
        <TimeSelector
          timeUnit={timeUnit}
          endTime={endTime}
          startTime={startTime}
          setEndTime={setEndTime}
          setStartTime={setStartTime}
        />
        <Calendar
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      </ControlContainer>
    </OuterContainer>
  );
}

export default Playground;

// styles
const OuterContainer = styled.div`
  display: flex;
  padding-top: 20px;
`;

const SelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 40px;
  gap: 20px;
`;

const Mode = styled.h1`
  font-size: 16px;
  font-weight: 700;
  font-family: 'SBAggroB';
  margin-bottom: 10px;
`;

const ControlTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: 'SBAggroB';
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  padding-top: 5px;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 10px 15px;
  color: #fff;
  background-color: #201c1d;
  border-radius: 30px;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #545454;
  }
`;
