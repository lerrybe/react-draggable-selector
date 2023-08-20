import React from 'react';

export type RowLabelStyleContextType = {
  gap?: string;
  rowHeight?: string;
  rowLabelBgColor?: string;
  rowLabelPadding?: string;
  rowLabelBorderRadius?: string;
  rowLabelsColor?: string;
  rowLabelsMargin?: string;
  rowLabelsBgColor?: string;
  rowLabelsFontSize?: string;
  rowLabelsFontWeight?: number;
  rowLabelsFontFamily?: string;
  rowLabelsBorderRadius?: string;
  setGap: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowHeight: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelBgColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelPadding: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelBorderRadius: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsMargin: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsBgColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsFontSize: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsFontWeight: React.Dispatch<React.SetStateAction<number | undefined>>;
  setRowLabelsFontFamily: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRowLabelsBorderRadius: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const initialData = {
  gap: '',
  rowHeight: '',
  rowLabelBgColor: '',
  rowLabelPadding: '',
  rowLabelBorderRadius: '',
  rowLabelsColor: '',
  rowLabelsMargin: '',
  rowLabelsBgColor: '',
  rowLabelsFontSize: '',
  rowLabelsFontWeight: 0,
  rowLabelsFontFamily: '',
  rowLabelsBorderRadius: '',
  setGap: () => {},
  setRowHeight: () => {},
  setRowLabelBgColor: () => {},
  setRowLabelPadding: () => {},
  setRowLabelBorderRadius: () => {},
  setRowLabelsColor: () => {},
  setRowLabelsMargin: () => {},
  setRowLabelsBgColor: () => {},
  setRowLabelsFontSize: () => {},
  setRowLabelsFontWeight: () => {},
  setRowLabelsFontFamily: () => {},
  setRowLabelsBorderRadius: () => {},
};
