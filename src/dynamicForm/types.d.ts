import React from "react";

/*export interface OptionType {
    key: number;
    label: string;
    value: string;
    [propName: string]: any;
};*/

export interface ColClassesType {
    csscolsm?: number;
    csscolmd?: number;
    csscolxs?: number;
    cssmb?: number;//for bottpm margin
    /*mb-0: margin-bottom of 0rem (0 pixels)
    mb-1: margin-bottom of 0.25rem (4 pixels)
    mb-2: margin-bottom of 0.5rem (8 pixels)
    mb-3: margin-bottom of 1rem (16 pixels)
    mb-4: margin-bottom of 1.5rem (24 pixels)
    mb-5: margin-bottom of 3rem (48 pixels)*/
    containerclass?: string;
    controlcontainerclass?: string;
    
    //field starting with label will be applied to labels on control level when isLabelControlsHorizontal = true.
    //If it has labelcolsm then col-sm will be applied. It can be overriden on inidividual control levels.

    //field starting with control will be applied to Controls on control level when isLabelControlsHorizontal = true.
    //If it has controlcolsm then col-sm will be applied. It can be overriden on inidividual control levels.
    [key: string]: any;
};

export interface FormControlType<T> extends ColClassesType {
    key: keyof T;
    type: string;
    id?: string;
    name?: string;
    label?: string;
    onChange?: (event: ChangeEvent<any>,value: string | boolean, model: T) => void;
    options?: Record<string, unknown>[];
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

export interface ColumnType extends ColClassesType {
    columns?: ColumnType[];
    rows?: FormControlType[];
    type?: string;
    className?: string;
    hide?: boolean | string;
    controlProps?: Record<string, any>;
    horizontalAllControlsClass?: string;
};

export interface FormConfigType {
    columns: ColumnType[];
    containerClass?: string;
    isLabelControlsHorizontal?: boolean;
    validationRequired?: boolean;
};

export interface HeaderConfig {
    headerComp?: JSX.Element;
    title?: string;
    leftSideControls?: FormControlType[];
    rightSideControls?: FormControlType[];
    cssTitleCon?: string;
    cssTitle?: string;
    cssNonTitleCon?: string;
    cssLeftSideCon?: string;
    cssRightSideCon?: string;
};

export interface FooterConfig {
    footerComp?: JSX.Element;
    leftSideControls?: FormControlType[];
    rightSideControls?: FormControlType[];
    centerControls?: FormControlType[];
    cssCon?: string;
    cssLeftSideCon?: string;
    cssRightSideCon?: string;
    cssCenterCon?: string;
};

export interface DynamicFormSetting<T> {
    cssFramework?: string;
    cssClassInitial?: string
    header?: HeaderConfig,
    body: FormConfigType;
    footer?: FooterConfig;
    model: T;
    validateOnSubmit?: boolean;
    setModel: (value: T | ((prevState: T) => T)) => void;
    onChange?: (event: ChangeEvent<any>,key: keyof T, value: string | boolean, model: T) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>,key: keyof T, id: string, model: T) => void;
    setRef? (instance: any, key: keyof T): void;
    getCustomControls?: CustomControlCallback<T>;
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
export type ValidatorType<T,K> = {
    validate: (value: K, model: T, key: keyof T) => ValidationRule;
    type: string;
};
//export type ValidatorTypeForString = ValidatorType<{ [key: string]: string }, any>;
export type ErrorType = { [key: string]: ValidationRule[] };
export type ValidatorFunction = <T, K>(value: K, model: T, key: keyof T) => ValidationRule;

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
) => JSX.Element | null;

