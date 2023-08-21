import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { DEFAULT_LANG, DEFAULT_TIME_FORMAT } from '../../../constant/options';
import { useRowLabelStyleContext } from '../../../context/RowLabelStyleContext';
import { getSerializedTimeInfoFromSlot } from '../../../utils/time';

interface RowLabelProps {
  timeFormat?: string;
  timeSlots?: TimeSlot[];
  language?: 'en' | 'ko';
}

/*
  "RowLabel" component is used to display the "times" of the row.
*/
export default function RowLabel({ timeFormat, timeSlots, language }: RowLabelProps) {
  const value = useRowLabelStyleContext();

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
      $gap={value?.gap}
      $rowLabelsColor={value?.rowLabelsColor}
      $rowLabelsMargin={value?.rowLabelsMargin}
      $rowLabelsBgColor={value?.rowLabelsBgColor}
      $rowLabelsFontSize={value?.rowLabelsFontSize}
      $rowLabelsFontFamily={value?.rowLabelsFontFamily}
      $rowLabelsFontWeight={value?.rowLabelsFontWeight}
      $rowLabelsBorderRadius={value?.rowLabelsBorderRadius}
    >
      {timeSlots?.map(slot => {
        const { date, startTime, endTime } = getSerializedTimeInfoFromSlot(slot);
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return (
          <S.Item key={startTime} $height={value?.rowHeight}>
            <S.Label
              $padding={value?.rowLabelPadding}
              $rowLabelBgColor={value?.rowLabelBgColor}
              $rowLabelBorderRadius={value?.rowLabelBorderRadius}
            >
              {dayjsDate.format(timeFormat || DEFAULT_TIME_FORMAT)}
            </S.Label>
          </S.Item>
        );
      })}
    </S.Items>
  );
}
