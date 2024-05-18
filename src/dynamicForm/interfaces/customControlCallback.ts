import { CalculatedFields } from "./calculatedFields";
import { ColClassesType } from "./colClassesType";
import { FormControlType } from "./formControlType";
import { ErrorType } from "./validationTypes";

export type CustomControlCallback<T> = (
    controlType: string,
    model: T,
    index: number,
    errors: ErrorType,
    handleChange: (event: unknown, setting: FormControlType<T>) => void,
    handleRef: (setting: FormControlType<T>) => (node: any) => void,
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
    setting: FormControlType<T>,
    parentSetting: ColClassesType | null,
    calculatedFields: CalculatedFields<T>
) => JSX.Element | null;