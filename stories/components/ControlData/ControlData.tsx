import { useState } from 'react';
import { TimeSlot } from '../../types';
import { sampleDates } from '../../data/options';
import { DraggableSelector } from '../../../src/index';
import {
  DEFAULT_LANG,
  DEFAULT_MODE,
  DEFAULT_TIMEUNIT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_DATE_FORMAT,
} from '../../../src/constant/options';

function ControlData({
  endTime,
  startTime,
  mode = DEFAULT_MODE,
  language = DEFAULT_LANG,
  timeUnit = DEFAULT_TIMEUNIT,
  dateFormat = DEFAULT_DATE_FORMAT,
  timeFormat = DEFAULT_TIME_FORMAT,
}: {
  /**
   * Set the last time to display. Type it in 24-hour notation and write it as follows, `18:00`
   */
  endTime: string;
  /**
   * Set the start time to display. Type it in 24-hour notation and write it as follows, `09:00`
   */
  startTime: string;
  /**
   * Use the date format method of dayjs.
   * You can use the following link to set the formatting form.
   * (https://day.js.org/docs/en/display/format)
   */
  dateFormat?: string;
  /**
   * Use the time format method of dayjs.
   * You can use the following link to set the formatting form.
   * (https://day.js.org/docs/en/display/format)
   */
  timeFormat?: string;
  /**
   * Set the language that will appear in the selector.
   */
  language?: 'en' | 'ko';
  /**
   * Determines the time interval for the selector.
   * The amount of time a cell has.
   */
  timeUnit?: 5 | 10 | 15 | 20 | 30 | 60;
  /**
   * Decide whether to indicate all dates or by day of the week.
   * (In the 'day' version) If there is no day of the week corresponding to the selected date,
   * the cell is blocked so that it cannot be selected.
   */
  mode?: 'day' | 'date';
}) {
  const [selectedDates] = useState<Date[]>(sampleDates);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  return (
    <DraggableSelector
      mode={mode}
      language={language}
      timeUnit={timeUnit}
      dates={selectedDates}
      dateFormat={dateFormat}
      timeFormat={timeFormat}
      endTime={endTime || '18:00'}
      startTime={startTime || '11:00'}
      selectedTimeSlots={selectedTimeSlots}
      setSelectedTimeSlots={setSelectedTimeSlots}
    />
  );
}

export default ControlData;
