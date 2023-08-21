import React, { createContext, useContext, useState } from 'react';
import { ColumnLabelStyleContextType, initialData } from './ColumnLabelStyleContextData';

const ColumnLabelStyleContext = createContext<ColumnLabelStyleContextType>(initialData);

function ColumnLabelStyleProvider({ children }: { children: React.ReactNode }) {
  const [gap, setGap] = useState<string | undefined>(initialData?.gap);
  const [columnWidth, setColumnWidth] = useState<string | undefined>(initialData?.columnWidth);
  const [columnMinWidth, setColumnMinWidth] = useState<string | undefined>(initialData?.columnMinWidth);
  const [isColumnWidthGrow, setIsColumnWidthGrow] = useState<boolean | undefined>(initialData?.isColumnWidthGrow);
  const [columnLabelHeight, setColumnLabelHeight] = useState<string | undefined>(initialData?.columnLabelHeight);
  const [columnLabelBgColor, setColumnLabelBgColor] = useState<string | undefined>(initialData?.columnLabelBgColor);
  const [columnLabelPadding, setColumnLabelPadding] = useState<string | undefined>(initialData?.columnLabelPadding);
  const [columnLabelBorderRadius, setColumnLabelBorderRadius] = useState<string | undefined>(
    initialData?.columnLabelBorderRadius,
  );
  const [columnLabelsColor, setColumnLabelsColor] = useState<string | undefined>(initialData?.columnLabelsColor);
  const [columnLabelsMargin, setColumnLabelsMargin] = useState<string | undefined>(initialData?.columnLabelsMargin);
  const [columnLabelsBgColor, setColumnLabelsBgColor] = useState<string | undefined>(initialData?.columnLabelsBgColor);
  const [columnLabelsFontSize, setColumnLabelsFontSize] = useState<string | undefined>(
    initialData?.columnLabelsFontSize,
  );
  const [columnLabelsFontWeight, setColumnLabelsFontWeight] = useState<number | undefined>(
    initialData?.columnLabelsFontWeight,
  );
  const [columnLabelsFontFamily, setColumnLabelsFontFamily] = useState<string | undefined>(
    initialData?.columnLabelsFontFamily,
  );
  const [columnLabelsBorderRadius, setColumnLabelsBorderRadius] = useState<string | undefined>(
    initialData?.columnLabelsBorderRadius,
  );

  return (
    <ColumnLabelStyleContext.Provider
      value={{
        gap,
        setGap,
        columnWidth,
        setColumnWidth,
        columnMinWidth,
        setColumnMinWidth,
        isColumnWidthGrow,
        setIsColumnWidthGrow,
        columnLabelHeight,
        setColumnLabelHeight,
        columnLabelBgColor,
        setColumnLabelBgColor,
        columnLabelPadding,
        setColumnLabelPadding,
        columnLabelBorderRadius,
        setColumnLabelBorderRadius,
        columnLabelsColor,
        setColumnLabelsColor,
        columnLabelsMargin,
        setColumnLabelsMargin,
        columnLabelsBgColor,
        setColumnLabelsBgColor,
        columnLabelsFontSize,
        setColumnLabelsFontSize,
        columnLabelsFontWeight,
        setColumnLabelsFontWeight,
        columnLabelsFontFamily,
        setColumnLabelsFontFamily,
        columnLabelsBorderRadius,
        setColumnLabelsBorderRadius,
      }}
    >
      {children}
    </ColumnLabelStyleContext.Provider>
  );
}

export const useColumnLabelStyleContext = () => useContext(ColumnLabelStyleContext);

export default ColumnLabelStyleProvider;
