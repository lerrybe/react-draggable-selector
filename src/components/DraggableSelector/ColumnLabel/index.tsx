import dayjs from 'dayjs';
import * as S from './styles';

interface ColumnLabelProps {
  dates?: Date[];

  gap?: number;
  slotHeight?: number;
  slotMinWidth?: number;
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
export default function ColumnLabel({
  gap,
  dates,
  slotHeight,
  slotMinWidth,
}: ColumnLabelProps) {
  if (!dates || dates.length === 0) {
    return <></>;
  }

  return (
    <S.Items gap={gap}>
      {dates.map(date => {
        const key = date.getDate();
        return (
          <S.Item key={key} height={slotHeight} width={slotMinWidth}>
            {dayjs(date).format('M/D')}
          </S.Item>
        );
      })}
    </S.Items>
  );
}
