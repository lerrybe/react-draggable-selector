import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import * as S from './styles';
import { getSerializedTimeInfoFromSlot } from '../../../utils/time';
import { DEFAULT_LANG, DEFAULT_TIME_FORMAT } from '../../../constant/options';

import { useDataContext } from '../../../context/DataContext';
import { useSelectorInfoContext } from '../../../context/SelectorInfoContext';
import { useRowLabelStyleContext } from '../../../context/RowLabelStyleContext';

/*
  "RowLabel" component is used to display the "times" of the row.
*/
export default function RowLabel() {
  const rowValue = useRowLabelStyleContext();
  const { timeSlotMatrix } = useDataContext();
  const { language, timeFormat } = useSelectorInfoContext();

  if (!timeSlotMatrix || timeSlotMatrix?.length === 0 || timeSlotMatrix[0]?.length === 0) {
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
      {timeSlotMatrix[0]?.map(slot => {
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
