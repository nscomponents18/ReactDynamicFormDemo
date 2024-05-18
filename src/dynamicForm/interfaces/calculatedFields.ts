export interface CalculatedFields<T> {
    isLabelControlsHorizontal: boolean;
    disabled: boolean;
    required: boolean;
    value: T[keyof T] | undefined | null;
};