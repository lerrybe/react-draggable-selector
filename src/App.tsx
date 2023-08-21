import DraggableSelector from './components/DraggableSelector';
import { DraggableSelectorProps } from './types/draggableSelector';

import SlotStyleProvider from './context/SlotStyleContext';
import RowLabelStyleProvider from './context/RowLabelStyleContext';
import ColumnLabelStyleProvider from './context/ColumnLabelStyleContext';

export default function App(props: DraggableSelectorProps) {
  return (
    <RowLabelStyleProvider>
      <ColumnLabelStyleProvider>
        <SlotStyleProvider>
          <DraggableSelector {...props} />
        </SlotStyleProvider>
      </ColumnLabelStyleProvider>
    </RowLabelStyleProvider>
  );
}
