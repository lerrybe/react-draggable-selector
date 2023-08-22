import { useState } from 'react';
import styled from '@emotion/styled';

import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import TimeUnitSelector from './TimeUnitSelector';
import { DraggableSelector, TimeSlot } from '../../src';

export default function SampleDateMode({
  slotWidth = 62,
  slotHeight = 18,
  slotsMarginTop = 11,
  slotsMarginLeft = 20,
  maxWidth = '546px',
  maxHeight = '452px',
  defaultSlotColor = '#FFFFFF',
  selectedSlotColor = '#b3c6d3',
  disabledSlotColor = '#e1e1e1',
  hoveredSlotColor = '#eef2f6',
  slotsContainerBorder = '1px solid #8c8d94',
  slotsContainerBorderRadius = '0px',
  dateFormat = 'MM.DD',
  timeFormat = 'HH:mm A',
}: {
  /*
   * Use the date format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format), `string`. e.g. `MM.DD`, `YYYY-MM-DD`
   */
  dateFormat?: string;
  /*
   Use the time format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format), `string`. e.g. `HH:mm A`, `HH:mm`
   */
  timeFormat?: string;
  /*
   * The width of each slot. Assign the value in `number`.
   */
  slotWidth?: number;
  /*
   * The height of each slot. Assign the value in `number`.
   */
  slotHeight?: number;
  /*
   * The margin-top of slots container. Assign the value in `number`.
   */
  slotsMarginTop?: number;
  /*
   * The margin-left of slots container. Assign the value in `number`.
   */
  slotsMarginLeft?: number;
  /*
   * The max-width of selector. Assign the value in `string`. e.g. `536px`
   */
  maxWidth?: string;
  /*
   * The max-height of selector. Assign the value in `string`. e.g. `452px`, `100%`
   */
  maxHeight?: string;
  /*
   * The default color of each slot. Assign the value in `string`. e.g. `#FFFFFF`
   */
  defaultSlotColor?: string;
  /*
   * The color of each slot when it is selected. Assign the value in `string`. e.g. `#FFF5E5`
   */
  selectedSlotColor?: string;
  /*
   * The color of each slot when it is disabled. Assign the value in `string`. e.g. `#e1e1e1`
   */
  disabledSlotColor?: string;
  /*
   * The color of each slot when it is hovered. Assign the value in `string`. e.g. `#FFF5E5`
   */
  hoveredSlotColor?: string;
  /*
   * The border of slots container. Assign the value in `string`. e.g. `1px solid #8c8d94`
   */
  slotsContainerBorder?: string;
  /*
   * The border-radius of slots container. Assign the value in `string`. e.g. `0px`, `5px`
   */
  slotsContainerBorderRadius?: string;
}) {
  type TimeUnit = 5 | 10 | 15 | 20 | 30 | 60;
  const today = new Date();
  const [minTime, setMinTime] = useState<string>('11:00');
  const [maxTime, setMaxTime] = useState<string>('19:00');
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(30);
  const [dates, setDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <OuterContainer>
      <SelectorContainer>
        <TitleContainer>
          <ComponentTitle>* DraggableSelector</ComponentTitle>
        </TitleContainer>
        <DraggableSelector
          dates={dates}
          minTime={Number(minTime.split(':')[0])}
          maxTime={Number(maxTime.split(':')[0])}
          timeSlots={selectedTimeSlots}
          setTimeSlots={setSelectedTimeSlots}
          mode={'date'}
          timeUnit={timeUnit}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          slotWidth={slotWidth}
          slotHeight={slotHeight}
          slotsMarginTop={slotsMarginTop}
          slotsMarginLeft={slotsMarginLeft}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          defaultSlotColor={defaultSlotColor}
          selectedSlotColor={selectedSlotColor}
          disabledSlotColor={disabledSlotColor}
          hoveredSlotColor={hoveredSlotColor}
          slotsContainerBorder={slotsContainerBorder}
          slotsContainerBorderRadius={slotsContainerBorderRadius}
        />
      </SelectorContainer>

      <ControlContainer>
        <TitleContainer>
          <ControlTitle>{`* Control Ex.`}</ControlTitle>
          <Mode>{'(not provided)'}</Mode>
        </TitleContainer>

        <TimeUnitSelector timeUnit={timeUnit} setTimeUnit={setTimeUnit} />
        <TimeSelector maxTime={maxTime} minTime={minTime} setMaxTime={setMaxTime} setMinTime={setMinTime} />
        <Calendar dates={dates} setDates={setDates} />
      </ControlContainer>
    </OuterContainer>
  );
}

// styles
const OuterContainer = styled.div`
  display: flex;
  padding: 20px 30px 20px 0;
  justify-content: space-evenly;
  min-width: 870px;
  width: 100%;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-family: 'SBAggroB', sans-serif;
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
  font-family: 'SBAggroB', sans-serif;
  background-color: rgba(30, 167, 253, 0.21);
`;

const ControlTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  font-family: 'SBAggroB', sans-serif;
  background-color: rgba(255, 117, 146, 0.29);
`;
