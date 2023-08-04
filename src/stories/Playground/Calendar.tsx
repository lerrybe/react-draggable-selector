import { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

interface CalendarProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
}

function Calendar({ selectedDates, setSelectedDates }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const handleDateClick = (date: Date) => {
    const dateString = dayjs(date).format('YYYY/MM/DD');
    const dateIndex = selectedDates.findIndex(selectedDate =>
      dayjs(selectedDate).isSame(dateString, 'day'),
    );
    if (dateIndex !== -1) {
      // If the date is already selected, remove it from the array
      selectedDates.splice(dateIndex, 1);
      setSelectedDates([...selectedDates]);
    } else {
      // If the date is not selected, add it to the array
      setSelectedDates([...selectedDates, date]);
    }
  };

  const renderCalendar = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');
    const calendar = [];
    let currentDate = startDate;
    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, 'day')
    ) {
      const day = currentDate.toDate();
      const isCurrentMonth = currentDate.isSame(currentMonth, 'month');
      const isSelected = selectedDates.some(selectedDate =>
        dayjs(selectedDate).isSame(day, 'day'),
      );
      calendar.push({
        day: currentDate.date(),
        date: day,
        isCurrentMonth: isCurrentMonth,
        isSelected: isSelected,
      });
      currentDate = currentDate.add(1, 'day');
    }

    return (
      <CalendarGrid>
        {calendar.map(calendarDate => (
          <Day
            key={calendarDate.date.toString()}
            $isCurrentMonth={calendarDate.isCurrentMonth}
            $isSelected={calendarDate.isSelected}
            onClick={() => handleDateClick(calendarDate.date)}
          >
            {calendarDate.day}
          </Day>
        ))}
      </CalendarGrid>
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Button onClick={handlePrevMonth}>Prev</Button>
        <div>{currentMonth.format('YYYY MMMM')}</div>
        <Button onClick={handleNextMonth}>Next</Button>
      </CalendarHeader>
      <CalendarGrid>
        <CalendarDay>Sun</CalendarDay>
        <CalendarDay>Mon</CalendarDay>
        <CalendarDay>Tue</CalendarDay>
        <CalendarDay>Wed</CalendarDay>
        <CalendarDay>Thu</CalendarDay>
        <CalendarDay>Fri</CalendarDay>
        <CalendarDay>Sat</CalendarDay>
        {renderCalendar()}
      </CalendarGrid>
    </CalendarContainer>
  );
}

export default Calendar;

/* styles */
const CalendarContainer = styled.div`
  font-family: 'Pretendard-Regular', sans-serif;
  width: 300px;
  height: 270px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CalendarHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #e3e3e3;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(7, 40px);
`;

const CalendarDay = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
`;

interface DayProps {
  $isSelected: boolean;
  $isCurrentMonth: boolean;
}

const Day = styled.div<DayProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 13px;
  line-height: 40px;
  text-align: center;
  border-radius: 300px;
  cursor: pointer;

  ${({ $isCurrentMonth }) =>
    $isCurrentMonth
      ? `
    background-color: #f0f0f0;
  `
      : ''}
  ${({ $isSelected }) =>
    $isSelected
      ? `
    background-color: #4d4f51;
    color: #fff;
  `
      : ''}
`;
