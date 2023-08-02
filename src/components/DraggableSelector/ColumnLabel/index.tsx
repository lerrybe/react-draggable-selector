import dayjs from 'dayjs';
import * as S from './styles';

interface ColumnLabelProps {
  dates?: Date[];
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
const ColumnLabel = ({ dates }: ColumnLabelProps) => {
  if (!dates || dates.length === 0) {
    return <></>;
  }

  return (
    <S.Wrapper>
      {dates.map(date => {
        const key = date.getDate();
        return <S.Label key={key}>{dayjs(date).format('M/D')}</S.Label>;
      })}
    </S.Wrapper>
  );
};

export default ColumnLabel;
