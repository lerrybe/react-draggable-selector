import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { DEFAULT_LANG, DEFAULT_TIME_FORMAT } from '../../../constant/options';

import { getSerializedTimeInfoFromSlot } from '../../../utils/time';
import { useSelectorInfoContext } from '../../../context/SelectorInfoContext';
import { useRowLabelStyleContext } from '../../../context/RowLabelStyleContext';

interface RowLabelProps {
  timeSlots?: TimeSlot[];
}

/*
  "RowLabel" component is used to display the "times" of the row.
*/
export default function RowLabel({ timeSlots }: RowLabelProps) {
  const rowValue = useRowLabelStyleContext();
  const { language, timeFormat } = useSelectorInfoContext();

  if (!timeSlots || timeSlots?.length === 0) {
    return <></>;
  }

  if ((language || DEFAULT_LANG) === 'ko') {
    dayjs.locale('ko');
  } else {
    dayjs.locale('en');
  }

  return (
    <S.Items
      $gap={rowValue?.gap}
      $rowLabelsColor={rowValue?.rowLabelsColor}
      $rowLabelsMargin={rowValue?.rowLabelsMargin}
      $rowLabelsBgColor={rowValue?.rowLabelsBgColor}
      $rowLabelsFontSize={rowValue?.rowLabelsFontSize}
      $rowLabelsFontFamily={rowValue?.rowLabelsFontFamily}
      $rowLabelsFontWeight={rowValue?.rowLabelsFontWeight}
      $rowLabelsBorderRadius={rowValue?.rowLabelsBorderRadius}
    >
      {timeSlots?.map(slot => {
        const { date, startTime, endTime } = getSerializedTimeInfoFromSlot(slot);
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return (
          <S.Item key={startTime} $height={rowValue?.rowHeight}>
            <S.Label
              $padding={rowValue?.rowLabelPadding}
              $rowLabelBgColor={rowValue?.rowLabelBgColor}
              $rowLabelBorderRadius={rowValue?.rowLabelBorderRadius}
            >
              {dayjsDate.format(timeFormat || DEFAULT_TIME_FORMAT)}
            </S.Label>
          </S.Item>
        );
      })}
    </S.Items>
  );
}
