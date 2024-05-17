import { FormControlType } from "./formControlType";

export interface HeaderConfig<T> {
    headerComp?: JSX.Element;
    title?: string;
    leftSideControls?: FormControlType<T>[];
    rightSideControls?: FormControlType<T>[];
    cssTitleCon?: string;
    cssTitle?: string;
    cssNonTitleCon?: string;
    cssLeftSideCon?: string;
    cssRightSideCon?: string;
};