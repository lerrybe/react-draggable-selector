import React, { createContext, useContext, useState } from 'react';
import { initialData, RowLabelStyleContextType } from './RowLabelStyleContextData';

const RowLabelStyleContext = createContext<RowLabelStyleContextType>(initialData);

function RowLabelStyleProvider({ children }: { children: React.ReactNode }) {
  const [gap, setGap] = useState<string | undefined>(initialData.gap);
  const [rowHeight, setRowHeight] = useState<string | undefined>(initialData.rowHeight);
  const [rowLabelBgColor, setRowLabelBgColor] = useState<string | undefined>(initialData.rowLabelBgColor);
  const [rowLabelPadding, setRowLabelPadding] = useState<string | undefined>(initialData.rowLabelPadding);
  const [rowLabelBorderRadius, setRowLabelBorderRadius] = useState<string | undefined>(
    initialData.rowLabelBorderRadius,
  );
  const [rowLabelsColor, setRowLabelsColor] = useState<string | undefined>(initialData.rowLabelsColor);
  const [rowLabelsMargin, setRowLabelsMargin] = useState<string | undefined>(initialData.rowLabelsMargin);
  const [rowLabelsBgColor, setRowLabelsBgColor] = useState<string | undefined>(initialData.rowLabelsBgColor);
  const [rowLabelsFontSize, setRowLabelsFontSize] = useState<string | undefined>(initialData.rowLabelsFontSize);
  const [rowLabelsFontWeight, setRowLabelsFontWeight] = useState<number | undefined>(initialData.rowLabelsFontWeight);
  const [rowLabelsFontFamily, setRowLabelsFontFamily] = useState<string | undefined>(initialData.rowLabelsFontFamily);
  const [rowLabelsBorderRadius, setRowLabelsBorderRadius] = useState<string | undefined>(
    initialData.rowLabelsBorderRadius,
  );

  return (
    <RowLabelStyleContext.Provider
      value={{
        gap,
        setGap,
        rowHeight,
        setRowHeight,
        rowLabelBgColor,
        setRowLabelBgColor,
        rowLabelPadding,
        setRowLabelPadding,
        rowLabelBorderRadius,
        setRowLabelBorderRadius,
        rowLabelsColor,
        setRowLabelsColor,
        rowLabelsMargin,
        setRowLabelsMargin,
        rowLabelsBgColor,
        setRowLabelsBgColor,
        rowLabelsFontSize,
        setRowLabelsFontSize,
        rowLabelsFontWeight,
        setRowLabelsFontWeight,
        rowLabelsFontFamily,
        setRowLabelsFontFamily,
        rowLabelsBorderRadius,
        setRowLabelsBorderRadius,
      }}
    >
      {children}
    </RowLabelStyleContext.Provider>
  );
}

export const useRowLabelStyleContext = () => useContext(RowLabelStyleContext);

export default RowLabelStyleProvider;
