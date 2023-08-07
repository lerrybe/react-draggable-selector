import { useState } from 'react';
import styled from 'styled-components';

import { sampleDates } from '../../data/options.ts';
import { SampleDraggableSelectorProps, TimeSlot } from '../../types';

import Calendar from './Calendar.tsx';
import TimeSelector from './TimeSelector.tsx';
import TimeUnitSelector from './TimeUnitSelector.tsx';
import { DraggableSelector } from '../../../main.ts';

function Sample({
  dateFormat,
  timeFormat,
  slotHeight,
  slotMinWidth,
  slotRowGap,
  slotColumnGap,
  slotBorderStyle,
  slotBorderRadius,
  hoveredSlotColor,
  defaultSlotColor,
  selectedSlotColor,
  disabledSlotColor,
  rowLabelWidth,
  rowLabelsColor,
  rowLabelsFontSize,
  isRowLabelInvisible,
  columnLabelHeight,
  columnLabelsColor,
  columnLabelsFontSize,
  isColumnLabelInvisible,
}: SampleDraggableSelectorProps) {
  type TimeUnit = 5 | 10 | 15 | 20 | 30 | 60;
  const [lang, setLang] = useState<'en' | 'ko'>('en');
  const [mode, setMode] = useState<'day' | 'date'>('date');
  const [endTime, setEndTime] = useState<string>('18:30');
  const [startTime, setStartTime] = useState<string>('11:00');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(30);
  const [selectedDates, setSelectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <OuterContainer>
      <SelectorContainer>
        <TitleContainer>
          <ComponentTitle>* DraggableSelector</ComponentTitle>
          <Mode>{`${mode} & '${lang}' ver.`}</Mode>
        </TitleContainer>
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
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          slotHeight={slotHeight}
          slotMinWidth={slotMinWidth}
          slotRowGap={slotRowGap}
          slotColumnGap={slotColumnGap}
          slotBorderStyle={slotBorderStyle}
          slotBorderRadius={slotBorderRadius}
          hoveredSlotColor={hoveredSlotColor}
          defaultSlotColor={defaultSlotColor}
          selectedSlotColor={selectedSlotColor}
          disabledSlotColor={disabledSlotColor}
          rowLabelWidth={rowLabelWidth}
          rowLabelsColor={rowLabelsColor}
          rowLabelsFontSize={rowLabelsFontSize}
          isRowLabelInvisible={isRowLabelInvisible}
          columnLabelHeight={columnLabelHeight}
          columnLabelsColor={columnLabelsColor}
          columnLabelsFontSize={columnLabelsFontSize}
          isColumnLabelInvisible={isColumnLabelInvisible}
        />
      </SelectorContainer>

      <ControlContainer>
        <TitleContainer>
          <ControlTitle>{`* Control Examples`}</ControlTitle>
          <Mode>{'(not provided)'}</Mode>
        </TitleContainer>

        <div>
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

export default Sample;

// styles
const OuterContainer = styled.div`
  display: flex;
  padding: 20px 30px 20px 0px;
  justify-content: center;
  min-width: 870px;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  gap: 20px;
`;

const Mode = styled.h1`
  font-size: 14px;
  font-weight: 700;
  font-family: 'SBAggroB';
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 40px;
`;

const ComponentTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  font-family: 'SBAggroB';
  background-color: rgba(30, 167, 253, 0.21);
`;

const ControlTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: 'SBAggroB';
  background-color: rgba(255, 117, 146, 0.29);
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
