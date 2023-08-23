interface GridProps {
    $gridTemplateRows: string;
    $gridTemplateColumns: string;
    $slotsContainerBorder: string;
    $slotsContainerBorderRadius: string;
}
export declare const Grid: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & GridProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
interface SlotProps {
    $width: number;
    $height: number;
    $selected: boolean;
    $isDisabled: boolean;
    $isEvenIdx: boolean;
    $isRightMost: boolean;
    $isBottomMost: boolean;
    $defaultSlotColor: string;
    $selectedSlotColor: string;
    $disabledSlotColor: string;
    $hoveredSlotColor: string;
}
export declare const Slot: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: import("react").ElementType<any> | undefined;
} & SlotProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};
//# sourceMappingURL=styles.d.ts.map