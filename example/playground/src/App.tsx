import { useState } from 'react';
import styled from '@emotion/styled';
import { BsGithub } from 'react-icons/bs';
import { DiGithubFull, DiNpm } from 'react-icons/di';
import DraggableSelectorSample from './components/DraggableSelectorSample';

export default function App() {
  const [mode, setMode] = useState<'date' | 'day'>('day');
  const [defaultSlotColor, setDefaultSlotColor] = useState<string>('#ffffff');
  const [selectedSlotColor, setSelectedSlotColor] = useState<string>('#b3c6d3');
  const [disabledSlotColor, setDisabledSlotColor] = useState<string>('#e1e1e1');
  const [hoveredSlotColor, setHoveredSlotColor] = useState<string>('#eef2f6');
  const [slotWidth, setSlotWidth] = useState<number>(62);
  const [slotHeight, setSlotHeight] = useState<number>(18);
  const [slotsContainerBorder, setSlotsContainerBorder] = useState<string>('1px solid #8c8d94');
  const [dateFormat, setDateFormat] = useState<string>('MM.DD');
  const [timeFormat, setTimeFormat] = useState<string>('HH:mm A');

  return (
    <>
      <Title>React draggable selector</Title>
      <SubTitle>A react component that allows users to easily select time ranges by dragging.</SubTitle>
      <Container>
        <Buttons>
          <Button color={'#cc3534'} href={'https://www.npmjs.com/package/react-draggable-selector'} target="_blank">
            <DiNpm size={48} />
          </Button>
          <Button color={'#000'} href={'https://github.com/lerrybe/react-draggable-selector'} target="_blank">
            <BsGithub size={20} />
            <DiGithubFull size={32} />
          </Button>
        </Buttons>
        <Controls>
          <Control>
            <Label>* default</Label>
            <Input type="color" value={defaultSlotColor} onChange={e => setDefaultSlotColor(e.target.value)} />
          </Control>
          <Control>
            <Label>* selected</Label>
            <Input type="color" value={selectedSlotColor} onChange={e => setSelectedSlotColor(e.target.value)} />
          </Control>
          <Control>
            <Label>* disabled</Label>
            <Input type="color" value={disabledSlotColor} onChange={e => setDisabledSlotColor(e.target.value)} />
          </Control>
          <Control>
            <Label>* hovered</Label>
            <Input type="color" value={hoveredSlotColor} onChange={e => setHoveredSlotColor(e.target.value)} />
          </Control>
          <Control>
            <Label>* DateFormat</Label>
            <Input value={dateFormat} onChange={e => setDateFormat(e.target.value)} />
          </Control>
          <Control>
            <Label>* TimeFormat</Label>
            <Input value={timeFormat} onChange={e => setTimeFormat(e.target.value)} />
          </Control>
          <Control>
            <Label>* mode</Label>
            <Select value={mode} onChange={e => setMode(e.target.value as 'day' | 'date')}>
              <option value="day">Day</option>
              <option value="date">Date</option>
            </Select>
          </Control>
          <Control>
            <Label>* slot width</Label>
            <Input type="number" value={slotWidth} min={1} onChange={e => setSlotWidth(Number(e.target.value))} />
          </Control>
          <Control>
            <Label>* slot height</Label>
            <Input type="number" value={slotHeight} min={1} onChange={e => setSlotHeight(Number(e.target.value))} />
          </Control>
          <Control>
            <Label>* border style</Label>
            <TextInput value={slotsContainerBorder} onChange={e => setSlotsContainerBorder(e.target.value)} />
          </Control>
        </Controls>
      </Container>
      {mode === 'date' ? (
        <>
          <div></div>
          <DraggableSelectorSample
            mode={'date'}
            maxHeight={'400px'}
            defaultSlotColor={defaultSlotColor}
            selectedSlotColor={selectedSlotColor}
            disabledSlotColor={disabledSlotColor}
            hoveredSlotColor={hoveredSlotColor}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            slotWidth={slotWidth}
            slotHeight={slotHeight}
            slotsContainerBorder={slotsContainerBorder}
          />
        </>
      ) : (
        <>
          <DraggableSelectorSample
            mode={'day'}
            maxHeight={'400px'}
            defaultSlotColor={defaultSlotColor}
            selectedSlotColor={selectedSlotColor}
            disabledSlotColor={disabledSlotColor}
            hoveredSlotColor={hoveredSlotColor}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            slotWidth={slotWidth}
            slotHeight={slotHeight}
            slotsContainerBorder={slotsContainerBorder}
          />
        </>
      )}
    </>
  );
}

const Title = styled.h1`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  font-size: 28px;
  font-weight: 700;
  font-family: 'NanumSquareNeo-Variable', sans-serif;
`;

const SubTitle = styled.h3`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  font-family: 'NanumSquareNeo-Variable', sans-serif;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 62px;
  margin-bottom: 18px;
  margin-top: 30px;
  gap: 16px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: auto;
  gap: 6px;
`;

const Button = styled.a<{ color: string; width?: string }>`
  padding: 5px 12px;
  background-color: ${({ color }) => color};
  border-radius: 3px;
  color: #fff;
  height: 30px;
  display: flex;
  width: ${({ width }) => width || 'auto'};
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 100%;
  gap: 8px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 5px;
`;

const Label = styled.h6`
  font-size: 9px;
  text-align: left;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
`;

const Input = styled.input`
  width: 58px;
`;

const TextInput = styled.input`
  width: 110px;
`;

const Select = styled.select`
  height: 21.5px;
  width: 62px;
`;
