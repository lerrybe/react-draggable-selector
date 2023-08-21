import DraggableSelector from './components/DraggableSelector';
import { DraggableSelectorProps } from './types/draggableSelector';

import DataProvider from './context/DataContext';
import SlotStyleProvider from './context/SlotStyleContext';
import SelectorInfoProvider from './context/SelectorInfoContext';
import RowLabelStyleProvider from './context/RowLabelStyleContext';
import ColumnLabelStyleProvider from './context/ColumnLabelStyleContext';

export default function App(props: DraggableSelectorProps) {
  return (
    <DataProvider>
      <SlotStyleProvider>
        <SelectorInfoProvider>
          <RowLabelStyleProvider>
            <ColumnLabelStyleProvider>
              <DraggableSelector {...props} />
            </ColumnLabelStyleProvider>
          </RowLabelStyleProvider>
        </SelectorInfoProvider>
      </SlotStyleProvider>
    </DataProvider>
  );
}
