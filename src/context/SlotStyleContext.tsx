import React, { createContext, useContext, useState } from 'react';
import { initialData, SlotStyleContextType } from './SlotStyleContextData';

const SlotStyleContext = createContext<SlotStyleContextType>(initialData);

function SlotStyleProvider({ children }: { children: React.ReactNode }) {
  const [slotRowGap, setSlotRowGap] = useState<string | undefined>(initialData?.slotRowGap);
  const [slotColumnGap, setSlotColumnGap] = useState<string | undefined>(initialData?.slotColumnGap);
  const [slotHeight, setSlotHeight] = useState<string | undefined>(initialData?.slotHeight);
  const [slotWidth, setSlotWidth] = useState<string | undefined>(initialData?.slotWidth);
  const [slotMinWidth, setSlotMinWidth] = useState<string | undefined>(initialData?.slotMinWidth);
  const [isCursorPointer, setIsCursorPointer] = useState<boolean | undefined>(initialData?.isCursorPointer);
  const [isSlotWidthGrow, setIsSlotWidthGrow] = useState<boolean | undefined>(initialData?.isSlotWidthGrow);
  const [slotBorderStyle, setSlotBorderStyle] = useState<string | undefined>(initialData?.slotBorderStyle);
  const [hoveredSlotColor, setHoveredSlotColor] = useState<string | undefined>(initialData?.hoveredSlotColor);
  const [defaultSlotColor, setDefaultSlotColor] = useState<string | undefined>(initialData?.defaultSlotColor);
  const [selectedSlotColor, setSelectedSlotColor] = useState<string | undefined>(initialData?.selectedSlotColor);
  const [disabledSlotColor, setDisabledSlotColor] = useState<string | undefined>(initialData?.disabledSlotColor);
  const [slotBorderRadius, setSlotBorderRadius] = useState<string | undefined>(initialData?.slotBorderRadius);
  const [slotContainerBorderStyle, setSlotContainerBorderStyle] = useState<string | undefined>(
    initialData?.slotContainerBorderStyle,
  );

  return (
    <SlotStyleContext.Provider
      value={{
        slotRowGap,
        setSlotRowGap,
        slotColumnGap,
        setSlotColumnGap,
        slotHeight,
        setSlotHeight,
        slotWidth,
        setSlotWidth,
        slotMinWidth,
        setSlotMinWidth,
        isCursorPointer,
        setIsCursorPointer,
        isSlotWidthGrow,
        setIsSlotWidthGrow,
        slotBorderStyle,
        setSlotBorderStyle,
        hoveredSlotColor,
        setHoveredSlotColor,
        defaultSlotColor,
        setDefaultSlotColor,
        selectedSlotColor,
        setSelectedSlotColor,
        disabledSlotColor,
        setDisabledSlotColor,
        slotBorderRadius,
        setSlotBorderRadius,
        slotContainerBorderStyle,
        setSlotContainerBorderStyle,
      }}
    >
      {children}
    </SlotStyleContext.Provider>
  );
}

export const useSlotStyleContext = () => useContext(SlotStyleContext);

export default SlotStyleProvider;
