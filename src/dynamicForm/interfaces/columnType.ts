import { ColClassesType } from "./colClassesType";
import { FormControlType } from "./formControlType";

export interface ColumnType<T> extends ColClassesType {
    columns?: ColumnType<T>[];
    rows?: FormControlType<T>[];
    type?: string;
    className?: string;
    hide?: boolean | string;
    controlProps?: Record<string, any>;
    horizontalAllControlsClass?: string;
};