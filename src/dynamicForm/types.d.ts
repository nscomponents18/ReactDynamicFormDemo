import React from "react";

export interface OptionType {
    key: number;
    label: string;
    value: string;
    [propName: string]: any;
};

export interface ColClassesType {
    colsm?: number;
    colmd?: number;
    colxs?: number;
};

export interface FormControlType<T> extends ColClassesType {
    key: keyof T;
    type: string;
    id?: string;
    name?: string;
    label?: string;
    onChange?: (event: ChangeEvent<any>,value: string | boolean, model: T) => void;
    options?: OptionType[];
    placeholder?: string;
    hide?: boolean;
    disabled?: boolean;
    refRequired?: boolean;
    controlProps?: Record<string, any>;
    component?: React.ComponentType<any>;
    validators?: ValidatorFunction[];
};

export interface ColumnType extends ColClassesType {
    rows: FormControlType[];
};

export interface FormConfigType {
    columns: ColumnType[];
};

export interface DynamicFormSetting<T> {
    config: FormConfigType;
    //defaultValue?: T;
    model: T;
    setModel: (value: T | ((prevState: T) => T)) => void;
    onChange?: (event: ChangeEvent<any>,key: keyof T, value: string | boolean, model: T) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>,key: keyof T, model: T) => void;
    setRef? (instance: any, key: keyof T): void;
};


/*export interface ValidationRule {
    valid: boolean;
    message: string;
    [propName: string]: any;
}

export type ValidationResult = { 
    [key: string]: ValidationRule;
};
export type ValidatorType<T> = (value: T) => ValidationResult | null;
export type ValidatorTypeForString = ValidatorType<string>;
export type ErrorType = { [key: string]: ValidationResult[] };*/

export interface ValidationRule {
    type: string; //if someome wants to handle error accroding to type
    valid: boolean;
    message: string;
    [propName: string]: any;
}

/*export type ValidationResult = { 
    [key: string]: ValidationRule;
};*/

//export type ValidatorType<T> = (value: T) => ValidationResult | null;
export type ValidatorType<T,K> = (value: K, model: T, key: keyof T) => ValidationRule;
//export type ValidatorTypeForString = ValidatorType<{ [key: string]: string }, any>;
export type ErrorType = { [key: string]: ValidationRule[] };
export type ValidatorFunction = <T, K>(value: K, model: T, key: keyof T) => ValidationRule;

