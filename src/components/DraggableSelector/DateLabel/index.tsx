import * as S from './styles';

interface DateLabelProps {
  labels?: string[];
  slotWidth: number;
  marginBottom: number;
}

const DateLabel = ({ labels, slotWidth, marginBottom }: DateLabelProps) => {
  if (!labels || labels.length === 0) {
    return <></>;
  }

  return (
    <S.Container $marginBottom={marginBottom}>
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
