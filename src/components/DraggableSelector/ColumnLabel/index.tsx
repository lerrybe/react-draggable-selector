import dayjs from 'dayjs';
import S from './ColumnLabel.module.css';

interface ColumnLabelProps {
  dates?: Date[];
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
export default function ColumnLabel({ dates }: ColumnLabelProps) {
  if (!dates || dates.length === 0) {
    return <></>;
  }

  return (
    <ul className={S.wrapper}>
      {dates.map(date => {
        const key = date.getDate();
        return (
          <li key={key} className={S.label}>
            {dayjs(date).format('M/D')}
          </li>
        );
      })}
    </ul>
  );
}
