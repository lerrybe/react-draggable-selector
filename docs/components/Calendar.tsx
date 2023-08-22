import { useState } from 'react';
import styled from '@emotion/styled';

interface CalendarProps {
  dates: Date[];
  setDates: (dates: Date[]) => void;
}

function Calendar({ dates, setDates }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date: Date) => {
    const dateString = formatDateToString(date);
    const dateIndex = dates.findIndex(selectedDate => isSameDay(selectedDate, dateString));
    if (dateIndex !== -1) {
      // If the date is already selected, remove it from the array
      dates.splice(dateIndex, 1);
      setDates(getUniqueAndSortedDates([...dates]));
    } else {
      // If the date is not selected, add it to the array
      setDates(getUniqueAndSortedDates([...dates, date]));
    }
  };

  const getUniqueAndSortedDates = (dates: Date[]) => {
    const uniqueDates = Array.from(new Set(dates.map(date => date.getTime()))).map(time => new Date(time));
    return uniqueDates.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
  };

  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const isSameDay = (date1: Date, date2String: string) => {
    const date2 = new Date(date2String);
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(currentMonth);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(currentMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate.setDate(startOfMonth.getDate() - startOfMonth.getDay());
    const endDate = new Date(endOfMonth);
    endDate.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));

    const calendar = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const day = new Date(currentDate);
      const isCurrentMonth = currentDate.getMonth() === currentMonth.getMonth();
      const isSelected = dates.some(selectedDate => isSameDay(selectedDate, formatDateToString(day)));
      calendar.push({
        day: currentDate.getDate(),
        date: day,
        isCurrentMonth: isCurrentMonth,
        isSelected: isSelected,
      });
      currentDate.setDate(currentDate.getDate() + 1);
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
    setCurrentMonth(prevMonth => {
      const nextMonth = new Date(prevMonth);
      nextMonth.setMonth(prevMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const prevMonthCopy = new Date(prevMonth);
      prevMonthCopy.setMonth(prevMonth.getMonth() - 1);
      return prevMonthCopy;
    });
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <Button onClick={handlePrevMonth}>Prev</Button>
        <div>
          {currentMonth.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
          })}
        </div>
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
