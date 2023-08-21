import React, { createContext, useContext, useState } from 'react';
import { initialData, SelectorInfoContextType } from './SelectorInfoContextData';

const SelectorInfoContext = createContext<SelectorInfoContextType>(initialData);

function SelectorInfoProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'day' | 'date' | undefined>(initialData?.mode);
  const [language, setLanguage] = useState<'ko' | 'en' | undefined>(initialData?.language);
  const [dateFormat, setDateFormat] = useState<string | undefined>(initialData?.dateFormat);
  const [timeFormat, setTimeFormat] = useState<string | undefined>(initialData?.timeFormat);

  return (
    <SelectorInfoContext.Provider
      value={{
        mode,
        setMode,
        language,
        setLanguage,
        dateFormat,
        setDateFormat,
        timeFormat,
        setTimeFormat,
      }}
    >
      {children}
    </SelectorInfoContext.Provider>
  );
}

export const useSelectorInfoContext = () => useContext(SelectorInfoContext);

export default SelectorInfoProvider;
