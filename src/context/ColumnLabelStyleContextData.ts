import React from 'react';
import { DEFAULT_IS_SLOT_WIDTH_GROW } from '../constant/options';

export type ColumnLabelStyleContextType = {
  gap?: string;
  columnWidth?: string;
  columnMinWidth?: string;
  isColumnWidthGrow?: boolean;
  columnLabelHeight?: string;
  columnLabelBgColor?: string;
  columnLabelPadding?: string;
  columnLabelBorderRadius?: string;
  columnLabelsColor?: string;
  columnLabelsMargin?: string;
  columnLabelsBgColor?: string;
  columnLabelsFontSize?: string;
  columnLabelsFontWeight?: number;
  columnLabelsFontFamily?: string;
  columnLabelsBorderRadius?: string;
  setGap: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnWidth: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnMinWidth: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsColumnWidthGrow: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setColumnLabelHeight: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelBgColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelPadding: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelBorderRadius: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsMargin: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsBgColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsFontSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsFontWeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setColumnLabelsFontFamily: React.Dispatch<React.SetStateAction<string | undefined>>;
  setColumnLabelsBorderRadius: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const initialData = {
  gap: '',
  columnWidth: '',
  columnMinWidth: '',
  isColumnWidthGrow: DEFAULT_IS_SLOT_WIDTH_GROW,
  columnLabelHeight: '',
  columnLabelBgColor: '',
  columnLabelPadding: '',
  columnLabelBorderRadius: '',
  columnLabelsColor: '',
  columnLabelsMargin: '',
  columnLabelsBgColor: '',
  columnLabelsFontSize: '',
  columnLabelsFontWeight: 0,
  columnLabelsFontFamily: '',
  columnLabelsBorderRadius: '',
  setGap: () => {},
  setColumnWidth: () => {},
  setColumnMinWidth: () => {},
  setIsColumnWidthGrow: () => {},
  setColumnLabelHeight: () => {},
  setColumnLabelBgColor: () => {},
  setColumnLabelPadding: () => {},
  setColumnLabelBorderRadius: () => {},
  setColumnLabelsColor: () => {},
  setColumnLabelsMargin: () => {},
  setColumnLabelsBgColor: () => {},
  setColumnLabelsFontSize: () => {},
  setColumnLabelsFontWeight: () => {},
  setColumnLabelsFontFamily: () => {},
  setColumnLabelsBorderRadius: () => {},
};
