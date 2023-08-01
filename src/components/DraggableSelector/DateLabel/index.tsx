import moment from "moment";
import * as S from "./styles";

interface DateLabelProps {
  dates?: Date[];
}

const DateLabel = ({ dates }: DateLabelProps) => {
  if (!dates || dates.length === 0) {
    return <></>;
  }

  return (
    <S.Wrapper>
      {dates.map((date, index) => {
        return (
          <S.Label key={`${date.getDate()}${index}`}>
            {moment(date).format("M/D")}
          </S.Label>
        );
      })}
    </S.Wrapper>
  );
};

export default DateLabel;
