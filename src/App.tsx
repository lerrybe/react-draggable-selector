import { useState} from 'react';
import { Time, TimeSlot } from "./types/time";
import DraggableSelector from "./components/DraggableSelector";
// import styled from 'styled-components';
import './styles/global.css';

// import moment from 'moment';

function TimeSelector() {
  const [selectedTime] = useState<Time>({
    startTime: "12:01",
    endTime: "15:59",
  });
  const today = new Date();
  const [selectedDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 11),
  ]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  // const [sorted, setSorted] = useState<TimeSlot[]>([]);

  // useEffect(() => {
  //   setSorted(selectedTimeSlots.sort((a, b) => {
  //     if (a.date > b.date) {
  //       return 1;
  //     }
  //     if (a.date < b.date) {
  //       return -1;
  //     }
  //     if (a.startTime > b.startTime) {
  //       return 1;
  //     }
  //     if (a.startTime < b.startTime) {
  //       return -1;
  //     }
  //     return 0;
  //   }));
  // }, [selectedTimeSlots, setSelectedTimeSlots]);

  return (
    <>
      <DraggableSelector
        selectedTime={selectedTime}
        selectedDates={selectedDates}
        selectedTimeSlots={selectedTimeSlots}
        setSelectedTimeSlots={setSelectedTimeSlots}
      />
      {/*<div>*/}
      {/*  {sorted.length > 0 ? (*/}
      {/*    <>*/}
      {/*      <Example>{"선택된 날짜들"}</Example>*/}
      {/*      <Grid>*/}
      {/*        {selectedTimeSlots?.map((item) => {*/}
      {/*          return (*/}
      {/*            <Cell key={`${item.startTime}${item.date}${item.endTime}`}>*/}
      {/*              <h3 style={{ color: '#80d09b' }}>{`${moment.utc(item.date).lang("ko").format('YYYY년 M월 D일')}`}</h3>*/}
      {/*              <h3>{`${item.startTime} ~ ${item.endTime}`}</h3>*/}
      {/*            </Cell>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*      </Grid>*/}
      {/*    </>*/}
      {/*  ) : (*/}
      {/*    <Example>가능한 시간을 선택해주세요!</Example>*/}
      {/*  )}*/}
      {/*</div>*/}
    </>
  );
}

export default TimeSelector;
//
// const Example = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   font-family: 'GmarketSansMedium';
// `;
//
// const Cell = styled.div`
//   font-family: 'GmarketSansMedium';
//   font-size: 12px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;
//
// const Grid = styled.div`
//   margin-top: 20px;
//   display: grid;
//   grid-template-columns: repeat(6, 1fr);
//   grid-template-rows: repeat(6, 1fr);
//   row-gap: 10px;
//   column-gap: 10px;
//   justify-content: center;
//   align-items: center;
// `;


