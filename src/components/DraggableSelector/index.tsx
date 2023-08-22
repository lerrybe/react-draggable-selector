import React, { useEffect, useMemo, useState } from 'react';

import Selector from './Selector';
import {
  getStrTime,
  getTimeSlotRecord,
  getTimeSlotMatrix,
  getTimeSlotMatrixByDay,
  getFilteredTimeSlotsByDate,
  areTimeSlotsEqualByDayAndTime,
} from '../../utils/time';

import '../../styles/global.css';
import { TimeSlot, TimeSlotRecord } from '../../types/timeInfo';

export interface DraggableSelectorProps {
  /*
   * The start time of each day. Assign the value in `number`. e.g. `9`, `14`
   */
  minTime: number;
  /*
   * The end time of each day. Assign the value in `number`. e.g. `8`, `22`
   */
  maxTime: number;
  /*
   * The dates selected. Assign the value in `Date[]`. e.g. `[new Date('2021-01-01'), new Date('2021-01-02')]`
   */
  dates: Date[];
  /*
   * Use the date format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format), `string`. e.g. `MM.DD`, `YYYY-MM-DD`
   */
  dateFormat?: string;
  /*
   Use the time format method of dayjs. You can use the following link to set the formatting form. (https://day.js.org/docs/en/display/format), `string`. e.g. `HH:mm A`, `HH:mm`
   */
  timeFormat?: string;
  /*
   * Decide whether to indicate all dates or by day of the week. (In the 'day' version) If there is no day of the week corresponding to the selected date, the cell is blocked so that it cannot be selected. `day | date`. e.g. `day`, `date`
   */
  mode?: 'day' | 'date';
  /*
   * The time slots you selected. If you put the setTimeSlots in the props together, the result value will be automatically set according to the cell you selected. Create Date objects using the obtained timeSlot arrangement or use them in various ways. `TimeSlot[]`

   */
  timeSlots: TimeSlot[];
  /*
   * The function to set the time slots you selected. If you put the timeSlots in the props together, the result value will be automatically set according to the cell you selected. Create Date objects using the obtained timeSlot arrangement or use them in various ways. `React.Dispatch<React.SetStateAction<TimeSlot[]>>`
   */
  setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  /*
   * The time unit of each slot. Assign the value in `5 | 10 | 15 | 20 | 30 | 60`. e.g. `5`, `10`, `15`, `20`, `30`, `60`
   */
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60;
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
}

export default function DraggableSelector({
  minTime,
  maxTime,
  timeUnit = 30,
  dateFormat = 'MM.DD',
  timeFormat = 'HH:mm A',
  timeSlots,
  setTimeSlots,
  mode = 'date',
  dates,
  slotWidth = 62,
  slotHeight = 18,
  slotsMarginTop = 11,
  slotsMarginLeft = 20,
  maxWidth = '536px',
  maxHeight = '452px',
  defaultSlotColor = '#FFFFFF',
  selectedSlotColor = '#FFF5E5',
  disabledSlotColor = '#e1e1e1',
  hoveredSlotColor = '#FFF5E5',
  slotsContainerBorder = '1px solid #8c8d94',
  slotsContainerBorderRadius = '0px',
}: DraggableSelectorProps) {
  const [, setTimeSlotRecord] = useState<TimeSlotRecord>();
  const [cachedMatrix, setCachedMatrix] = useState<TimeSlot[][]>([]);
  const [timeSlotMatrix, setTimeSlotMatrix] = useState<TimeSlot[][]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [cachedMatrixByDay, setCachedMatrixByDay] = useState<TimeSlot[][]>([]);

  const datesForDayMode = useMemo(() => {
    return [
      new Date('2023-08-20'),
      new Date('2023-08-21'),
      new Date('2023-08-22'),
      new Date('2023-08-23'),
      new Date('2023-08-24'),
      new Date('2023-08-25'),
      new Date('2023-08-26'),
    ];
  }, [mode]);

  /* 🧹 Cleanup timeSlots & selectedTimeSlots when mode, minTime, maxTime, timeUnit is changed */
  useEffect(() => {
    setTimeSlots([]);
    setSelectedTimeSlots([]);
  }, [mode, minTime, maxTime, timeUnit]);

  /* Initialize timeSlotMatrix when mode, dates, minTime, maxTime, timeUnit is changed */
  useEffect(() => {
    const targetDates = mode === 'day' ? datesForDayMode : dates;
    const record = getTimeSlotRecord({
      minTime,
      maxTime,
      timeUnit,
      dates: targetDates,
    });
    if (record) {
      setTimeSlotRecord(record);
      setTimeSlotMatrix(getTimeSlotMatrix(record));
    } else {
      setTimeSlotRecord({});
      setTimeSlotMatrix([]);
    }
    if (mode === 'day') {
      const cachedRecord = getTimeSlotRecord({
        dates,
        minTime,
        maxTime,
        timeUnit,
      });
      if (cachedRecord) {
        setCachedMatrix(getTimeSlotMatrix(cachedRecord));
      } else {
        setCachedMatrix([]);
      }
    }
  }, [mode, dates, minTime, maxTime, timeUnit]);

  /* (🧪 Reprocessing) SET TIME SLOTS for USER DATA */
  useEffect(() => {
    if (mode === 'date') {
      setTimeSlots([...selectedTimeSlots]);
    } else {
      const updatedTimeSlots: TimeSlot[] = [];
      selectedTimeSlots?.forEach(slot => {
        const target = getTimeSlotMatrixByDay(cachedMatrix);
        if (target) {
          const targetArr = target[slot.day];
          targetArr?.forEach(t => {
            if (areTimeSlotsEqualByDayAndTime(t, slot)) {
              updatedTimeSlots.push(t);
            }
          });
        }
      });
      setTimeSlots(updatedTimeSlots);
    }
  }, [selectedTimeSlots, cachedMatrix]);
  useEffect(() => {
    if (mode === 'day') {
      const updatedTimeSlots = getFilteredTimeSlotsByDate(dates, timeSlots);
      setTimeSlots(updatedTimeSlots);
    }
  }, [dates]);
  useEffect(() => {
    const updatedCachedMatrixByDay = getTimeSlotMatrixByDay(cachedMatrix);
    if (updatedCachedMatrixByDay) {
      setCachedMatrixByDay(updatedCachedMatrixByDay);
    } else {
      setCachedMatrixByDay([]);
    }
  }, [dates, cachedMatrix]);

  return (
    <Selector
      mode={mode}
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
      minTime={getStrTime(minTime)}
      maxTime={getStrTime(maxTime)}
      timeUnit={timeUnit}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      timeSlotMatrix={timeSlotMatrix}
      cachedMatrixByDay={cachedMatrixByDay}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
      selectedDates={mode === 'day' ? datesForDayMode : dates}
    />
  );
}
