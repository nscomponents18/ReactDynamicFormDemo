import { ChangeEvent } from "react";
import { ColClassesType } from "./colClassesType";
import { ValidatorType } from "./validationTypes";

export interface FormControlType<T> extends ColClassesType {
    key?: string;//keyof T;
    type: string;
    id?: string;
    name?: string;
    label?: string;
    onChange?: (event: ChangeEvent<any> | unknown,value: string | boolean, model: T) => void;
    options?: Record<string, unknown>[] | string[];
    labelField?: string;
    valueField?: string;
    placeholder?: string;
    hide?: boolean | string;
    disabled?: boolean;
    required?: boolean;
    refRequired?: boolean;
    className?: string;
    buttontype?: string;
    additionalInfo?: string;
    controlProps?: Record<string, any>;
    component?: React.ComponentType<any>;
    validators?: ValidatorType<T, any>[];
};