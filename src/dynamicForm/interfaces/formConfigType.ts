import { ColumnType } from "./columnType";

export interface FormConfigType<T> {
    columns: ColumnType<T>[];
    containerClass?: string;
    isLabelControlsHorizontal?: boolean;
    validationRequired?: boolean;
};