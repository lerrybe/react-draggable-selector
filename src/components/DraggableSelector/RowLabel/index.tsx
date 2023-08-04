import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';

interface RowLabelProps {
  timeFormat?: string;
  timeSlots?: TimeSlot[];
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
              {dayjsDate.format(timeFormat || 'hh:mm A')}
            </S.Label>
          </S.Item>
        );
      })}
    </S.Items>
  );
}
