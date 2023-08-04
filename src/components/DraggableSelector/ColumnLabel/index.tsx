import dayjs from 'dayjs';
import * as S from './styles';
import { getIterableDays, getUniqueDateKey } from '../../../utils/date';

interface ColumnLabelProps {
  dates?: Date[];
  dateFormat?: string;
  mode: 'date' | 'day';
  language: 'en' | 'ko';
  gap?: string;
  slotHeight?: string;
  slotMinWidth?: string;
  columnLabelBgColor?: string;
  columnLabelPadding?: string;
  columnLabelBorderRadius?: string;
  columnLabelsColor?: string;
  columnLabelsMargin?: string;
  columnLabelsBgColor?: string;
  columnLabelsFontSize?: string;
  columnLabelsFontFamily?: string;
  columnLabelsFontWeight?: number;
  columnLabelsBorderRadius?: string;
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
export default function ColumnLabel({
  gap,
  mode,
  dates,
  language,
  dateFormat,
  slotHeight,
  slotMinWidth,
  columnLabelBgColor,
  columnLabelPadding,
  columnLabelBorderRadius,
  columnLabelsColor,
  columnLabelsMargin,
  columnLabelsBgColor,
  columnLabelsFontSize,
  columnLabelsFontFamily,
  columnLabelsFontWeight,
  columnLabelsBorderRadius,
}: ColumnLabelProps) {
  if (!dates || dates.length === 0) {
    return <></>;
  }

  return (
    <S.Items
      $gap={gap}
      $columnLabelsColor={columnLabelsColor}
      $columnLabelsMargin={columnLabelsMargin}
      $columnLabelsBgColor={columnLabelsBgColor}
      $columnLabelsFontSize={columnLabelsFontSize}
      $columnLabelsFontFamily={columnLabelsFontFamily}
      $columnLabelsFontWeight={columnLabelsFontWeight}
      $columnLabelsBorderRadius={columnLabelsBorderRadius}
    >
      {mode === 'day' ? (
        <>
          {getIterableDays(language).map(day => {
            return (
              <S.Item key={day} $height={slotHeight} $width={slotMinWidth}>
                <S.Label
                  $padding={columnLabelPadding}
                  $columnLabelBgColor={columnLabelBgColor}
                  $columnLabelBorderRadius={columnLabelBorderRadius}
                >
                  {day}
                </S.Label>
              </S.Item>
            );
          })}
        </>
      ) : (
        <>
          {dates.map(date => {
            return (
              <S.Item
                $height={slotHeight}
                $width={slotMinWidth}
                key={getUniqueDateKey(date)}
              >
                <S.Label
                  $padding={columnLabelPadding}
                  $columnLabelBgColor={columnLabelBgColor}
                  $columnLabelBorderRadius={columnLabelBorderRadius}
                >
                  {dayjs(date).format(dateFormat || 'M/D')}
                </S.Label>
              </S.Item>
            );
          })}
        </>
      )}
    </S.Items>
  );
}
