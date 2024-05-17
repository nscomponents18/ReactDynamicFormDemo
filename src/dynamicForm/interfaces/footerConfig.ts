import { FormControlType } from "./formControlType";

export interface FooterConfig<T> {
    footerComp?: JSX.Element;
    leftSideControls?: FormControlType<T>[];
    rightSideControls?: FormControlType<T>[];
    centerControls?: FormControlType<T>[];
    cssCon?: string;
    cssLeftSideCon?: string;
    cssRightSideCon?: string;
    cssCenterCon?: string;
};