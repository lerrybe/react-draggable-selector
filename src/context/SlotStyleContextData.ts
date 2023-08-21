import React from 'react';
import { DEFAULT_IS_SLOT_WIDTH_GROW } from '../constant/options';

export type SlotStyleContextType = {
  slotRowGap?: string;
  slotColumnGap?: string;
  slotHeight?: string;
  slotWidth?: string;
  slotMinWidth?: string;
  isSlotWidthGrow?: boolean;
  slotBorderStyle?: string;
  hoveredSlotColor?: string;
  selectedSlotColor?: string;
  disabledSlotColor?: string;
  defaultSlotColor?: string;
  slotBorderRadius?: string;
  setSlotRowGap: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSlotColumnGap: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSlotHeight: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSlotWidth: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSlotMinWidth: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsSlotWidthGrow: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSlotBorderStyle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setHoveredSlotColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedSlotColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDisabledSlotColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDefaultSlotColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSlotBorderRadius: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const initialData = {
  slotRowGap: '',
  slotColumnGap: '',
  slotHeight: '',
  slotWidth: '',
  slotMinWidth: '',
  isSlotWidthGrow: DEFAULT_IS_SLOT_WIDTH_GROW,
  slotBorderStyle: '',
  hoveredSlotColor: '',
  selectedSlotColor: '',
  disabledSlotColor: '',
  defaultSlotColor: '',
  slotBorderRadius: '',
  setSlotRowGap: () => {},
  setSlotColumnGap: () => {},
  setSlotHeight: () => {},
  setSlotWidth: () => {},
  setSlotMinWidth: () => {},
  setIsSlotWidthGrow: () => {},
  setSlotBorderStyle: () => {},
  setHoveredSlotColor: () => {},
  setSelectedSlotColor: () => {},
  setDisabledSlotColor: () => {},
  setDefaultSlotColor: () => {},
  setSlotBorderRadius: () => {},
};
