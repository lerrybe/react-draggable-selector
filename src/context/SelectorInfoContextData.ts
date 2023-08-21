import React from 'react';

export type SelectorInfoContextType = {
  timeFormat?: string;
  dateFormat?: string;
  mode?: 'day' | 'date';
  language?: 'en' | 'ko';

  setTimeFormat: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDateFormat: React.Dispatch<React.SetStateAction<string | undefined>>;
  setMode: React.Dispatch<React.SetStateAction<'day' | 'date' | undefined>>;
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ko' | undefined>>;
};

export const initialData = {
  mode: undefined,
  timeFormat: undefined,
  dateFormat: undefined,
  language: undefined,
  setMode: () => {},
  setLanguage: () => {},
  setTimeFormat: () => {},
  setDateFormat: () => {},
};
