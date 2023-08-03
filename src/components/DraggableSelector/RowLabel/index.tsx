import dayjs from 'dayjs';
import * as S from './styles';
import { type TimeSlot } from '../../../types/time';

interface RowLabelProps {
  timeSlots?: TimeSlot[];

  gap?: string;
  slotHeight?: string;
  rowLabelsBgColor?: string;
  rowLabelsBorderRadius?: string;
  rowLabelsColor?: string;
  rowLabelsFontWeight?: number;
  rowLabelsMargin?: string;
  rowLabelsFontSize?: string;
  rowLabelsFontFamily?: string;
  rowLabelBorderRadius?: string;
  rowLabelBgColor?: string;
  rowLabelPadding?: string;

  timeFormat?: string;
}

export default function RowLabel({
  timeSlots,
  gap,
  slotHeight,
  rowLabelsBgColor,
  rowLabelsBorderRadius,
  rowLabelsColor,
  rowLabelsFontWeight,
  rowLabelsMargin,
  rowLabelsFontSize,
  rowLabelsFontFamily,
  rowLabelBgColor,
  rowLabelBorderRadius,
  rowLabelPadding,
  timeFormat,
}: RowLabelProps) {
  if (!timeSlots || timeSlots.length === 0) {
    return <></>;
  }

  return (
    <S.Items
      $gap={gap}
      $rowLabelsBgColor={rowLabelsBgColor}
      $rowLabelsBorderRadius={rowLabelsBorderRadius}
      $rowLabelsColor={rowLabelsColor}
      $rowLabelsFontWeight={rowLabelsFontWeight}
      $rowLabelsMargin={rowLabelsMargin}
      $rowLabelsFontSize={rowLabelsFontSize}
      $rowLabelsFontFamily={rowLabelsFontFamily}
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
