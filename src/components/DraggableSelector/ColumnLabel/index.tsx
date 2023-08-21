import dayjs from 'dayjs';
import * as S from './styles';
import { getIterableDays, getUniqueDateKey } from '../../../utils/date';
import { useColumnLabelStyleContext } from '../../../context/ColumnLabelStyleContext';
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_IS_SLOT_WIDTH_GROW,
  DEFAULT_LANG,
  DEFAULT_MODE,
  DEFAULT_SLOT_WIDTH,
} from '../../../constant/options';

interface ColumnLabelProps {
  gap?: string;
  dates?: Date[];
  dateFormat?: string;
  mode?: 'date' | 'day';
  language?: 'en' | 'ko';
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
export default function ColumnLabel({ gap, mode, dates, language, dateFormat }: ColumnLabelProps) {
  const value = useColumnLabelStyleContext();

  if (!dates || dates?.length === 0) {
    return <></>;
  }

  return (
    <S.Items
      $gap={gap}
      $columnLabelsColor={value?.columnLabelsColor}
      $columnLabelsMargin={value?.columnLabelsMargin}
      $columnLabelsBgColor={value?.columnLabelsBgColor}
      $columnLabelsFontSize={value?.columnLabelsFontSize}
      $columnLabelsFontFamily={value?.columnLabelsFontFamily}
      $columnLabelsFontWeight={value?.columnLabelsFontWeight}
      $columnLabelsBorderRadius={value?.columnLabelsBorderRadius}
      $isSlotWidthGrow={value?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
    >
      {(mode || DEFAULT_MODE) === 'day' ? (
        <>
          {getIterableDays(language || DEFAULT_LANG)?.map(day => {
            return (
              <S.Item
                key={day}
                $minWidth={value?.columnMinWidth}
                $height={value?.columnLabelHeight}
                $width={value?.columnWidth || DEFAULT_SLOT_WIDTH}
                $isSlotWidthGrow={value?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
              >
                <S.Label
                  $padding={value?.columnLabelPadding}
                  $columnLabelBgColor={value?.columnLabelBgColor}
                  $columnLabelBorderRadius={value?.columnLabelBorderRadius}
                >
                  {day}
                </S.Label>
              </S.Item>
            );
          })}
        </>
      ) : (
        <>
          {dates?.map(date => {
            return (
              <S.Item
                key={getUniqueDateKey(date)}
                $minWidth={value?.columnMinWidth}
                $height={value?.columnLabelHeight}
                $width={value?.columnWidth || DEFAULT_SLOT_WIDTH}
                $isSlotWidthGrow={value?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
              >
                <S.Label
                  $padding={value?.columnLabelPadding}
                  $columnLabelBgColor={value?.columnLabelBgColor}
                  $columnLabelBorderRadius={value?.columnLabelBorderRadius}
                >
                  {dayjs(date).format(dateFormat || DEFAULT_DATE_FORMAT)}
                </S.Label>
              </S.Item>
            );
          })}
        </>
      )}
    </S.Items>
  );
}
