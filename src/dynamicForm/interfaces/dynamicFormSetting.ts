import { ChangeEvent } from "react";
import { FooterConfig } from "./footerConfig";
import { FormConfigType } from "./formConfigType";
import { HeaderConfig } from "./headerConfig";
import { CustomControlCallback } from "./customControlCallback";

export interface DynamicFormSetting<T> {
    cssFramework?: string;
    cssClassInitial?: string
    header?: HeaderConfig<T>,
    body: FormConfigType<T>;
    footer?: FooterConfig<T>;
    model: T;
    validateOnSubmit?: boolean;
    setModel: (value: T | ((prevState: T) => T)) => void;
    onChange?: (event: ChangeEvent<any> | unknown,key: keyof T, value: string | boolean, model: T) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>,key: keyof T, id: string, model: T) => void;
    setRef? (instance: any, key: keyof T): void;
    getCustomControls?: CustomControlCallback<T>;
};