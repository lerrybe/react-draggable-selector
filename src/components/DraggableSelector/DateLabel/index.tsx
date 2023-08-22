import * as S from './styles';

interface DateLabelProps {
  colGap: number;
  labels?: string[];
  slotWidth: number;
  marginBottom: number;
}

const DateLabel = ({
  colGap,
  labels,
  slotWidth,
  marginBottom,
}: DateLabelProps) => {
  if (!labels || labels.length === 0) {
    return <></>;
  }

  return (
    <S.Container $colGap={colGap} $marginBottom={marginBottom}>
      {labels?.map((label, index) => {
        return (
          <S.Label key={`${label}${index}`} $width={slotWidth}>
            {label}
          </S.Label>
        );
      })}
    </S.Container>
  );
};

export default DateLabel;
