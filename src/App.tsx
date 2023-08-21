import DraggableSelector from './components/DraggableSelector';
import { DraggableSelectorProps } from './types/draggableSelector';

import DataProvider from './context/DataContext';
import SlotStyleProvider from './context/SlotStyleContext';
import RowLabelStyleProvider from './context/RowLabelStyleContext';
import ColumnLabelStyleProvider from './context/ColumnLabelStyleContext';

export default function App(props: DraggableSelectorProps) {
  return (
    <DataProvider>
      <RowLabelStyleProvider>
        <ColumnLabelStyleProvider>
          <SlotStyleProvider>
            <DraggableSelector {...props} />
          </SlotStyleProvider>
        </ColumnLabelStyleProvider>
      </RowLabelStyleProvider>
    </DataProvider>
  );
}
