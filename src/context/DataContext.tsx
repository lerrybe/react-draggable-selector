import React, { createContext, useContext, useState } from 'react';
import { initialData, DataContextType } from './DataContextData';

const DataContext = createContext<DataContextType>(initialData);

function DataProvider({ children }: { children: React.ReactNode }) {
  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);

export default DataProvider;
