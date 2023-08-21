import dayjs from 'dayjs';
import * as S from './styles';
import { useSelectorInfoContext } from '../../../context/SelectorInfoContext';
import { getIterableDays, getUniqueDateKey } from '../../../utils/date';
import { useColumnLabelStyleContext } from '../../../context/ColumnLabelStyleContext';
import {
  DEFAULT_LANG,
  DEFAULT_MODE,
  DEFAULT_SLOT_WIDTH,
  DEFAULT_DATE_FORMAT,
  DEFAULT_IS_SLOT_WIDTH_GROW,
} from '../../../constant/options';

interface ColumnLabelProps {
  dates?: Date[];
}

/*
  "ColumnLabel" component is used to display the "date or day" of the column.
*/
export default function ColumnLabel({ dates }: ColumnLabelProps) {
  const colValue = useColumnLabelStyleContext();
  const { mode, language, dateFormat } = useSelectorInfoContext();

  if (!dates || dates?.length === 0) {
    return <></>;
  }

  return (
    <S.Items
      $gap={colValue?.gap}
      $columnLabelsColor={colValue?.columnLabelsColor}
      $columnLabelsMargin={colValue?.columnLabelsMargin}
      $columnLabelsBgColor={colValue?.columnLabelsBgColor}
      $columnLabelsFontSize={colValue?.columnLabelsFontSize}
      $columnLabelsFontFamily={colValue?.columnLabelsFontFamily}
      $columnLabelsFontWeight={colValue?.columnLabelsFontWeight}
      $columnLabelsBorderRadius={colValue?.columnLabelsBorderRadius}
      $isSlotWidthGrow={colValue?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
    >
      {(mode || DEFAULT_MODE) === 'day' ? (
        <>
          {getIterableDays(language || DEFAULT_LANG)?.map(day => {
            return (
              <S.Item
                key={day}
                $minWidth={colValue?.columnMinWidth}
                $height={colValue?.columnLabelHeight}
                $width={colValue?.columnWidth || DEFAULT_SLOT_WIDTH}
                $isSlotWidthGrow={colValue?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
              >
                <S.Label
                  $padding={colValue?.columnLabelPadding}
                  $columnLabelBgColor={colValue?.columnLabelBgColor}
                  $columnLabelBorderRadius={colValue?.columnLabelBorderRadius}
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
                $minWidth={colValue?.columnMinWidth}
                $height={colValue?.columnLabelHeight}
                $width={colValue?.columnWidth || DEFAULT_SLOT_WIDTH}
                $isSlotWidthGrow={colValue?.isColumnWidthGrow || DEFAULT_IS_SLOT_WIDTH_GROW}
              >
                <S.Label
                  $padding={colValue?.columnLabelPadding}
                  $columnLabelBgColor={colValue?.columnLabelBgColor}
                  $columnLabelBorderRadius={colValue?.columnLabelBorderRadius}
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
