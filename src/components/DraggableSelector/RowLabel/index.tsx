import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';
import { DEFAULT_TIME_FORMAT } from '../../../constant/options';

interface RowLabelProps {
  timeFormat?: string;
  timeSlots?: TimeSlot[];
  language?: 'en' | 'ko';
  gap?: string;
  slotHeight?: string;
  rowLabelBgColor?: string;
  rowLabelPadding?: string;
  rowLabelBorderRadius?: string;
  rowLabelsColor?: string;
  rowLabelsMargin?: string;
  rowLabelsBgColor?: string;
  rowLabelsFontSize?: string;
  rowLabelsFontFamily?: string;
  rowLabelsFontWeight?: number;
  rowLabelsBorderRadius?: string;
}

/*
  "RowLabel" component is used to display the "times" of the row.
*/
export default function RowLabel({
  timeFormat,
  timeSlots,
  language,
  gap,
  slotHeight,
  rowLabelPadding,
  rowLabelBgColor,
  rowLabelBorderRadius,
  rowLabelsColor,
  rowLabelsMargin,
  rowLabelsBgColor,
  rowLabelsFontSize,
  rowLabelsFontFamily,
  rowLabelsFontWeight,
  rowLabelsBorderRadius,
}: RowLabelProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  if (language === 'ko') {
    dayjs.locale('ko');
  } else {
    dayjs.locale('en');
  }

  return (
    <S.Items
      $gap={gap}
      $rowLabelsColor={rowLabelsColor}
      $rowLabelsMargin={rowLabelsMargin}
      $rowLabelsBgColor={rowLabelsBgColor}
      $rowLabelsFontSize={rowLabelsFontSize}
      $rowLabelsFontFamily={rowLabelsFontFamily}
      $rowLabelsFontWeight={rowLabelsFontWeight}
      $rowLabelsBorderRadius={rowLabelsBorderRadius}
    >
      {timeSlots.map(({ date, startTime, endTime }) => {
        const dayjsDate = dayjs(`${date} ${startTime}:${endTime}`);
        return (
          <S.Item key={startTime} $height={slotHeight}>
            <S.Label
              $padding={rowLabelPadding}
              $rowLabelBgColor={rowLabelBgColor}
              $rowLabelBorderRadius={rowLabelBorderRadius}
            >
              {dayjsDate.format(timeFormat || DEFAULT_TIME_FORMAT)}
            </S.Label>
          </S.Item>
        );
      })}
    </S.Items>
  );
}
