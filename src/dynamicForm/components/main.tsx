import React from 'react';
import BodyControl from './bodyControl';
import HeaderControl from './headerControl';
import '../css/dynamicForm.css';
import { isEventObject, isUndefinedOrNull } from '../utils/utils';
import { ErrorType, ValidationRule, ValidatorType } from '../interfaces/validationTypes';
import { CSS_FRAMEWORK } from '../constants';
import { ColumnType } from '../interfaces/columnType';
import { FormControlType } from '../interfaces/formControlType';
import FooterControl from './footerControl';
import { DynamicFormSetting } from '../interfaces/dynamicFormSetting';

const DynamicForm = <T extends {}>({cssFramework, cssClassInitial, header, body, footer, model, setModel, validateOnSubmit, onChange, onClick, setRef, getCustomControls }: DynamicFormSetting<T>): JSX.Element => {
    //const [model, setModel] = React.useState<T>(defaultValue || {} as T);
    const [errors, setErrors] = React.useState<ErrorType>({});
    const [cssDefaults, setCssDefaults] = React.useState<Record<string,string | boolean | Record<string,unknown>>>({});

    /*React.useEffect(() => {
        const initialData: { [key: string]: any } = { ...model };
        body.columns.forEach(column => {
            column.rows.forEach(row => {
                if(isUndefined(initialData[row.key])) {
                    if (row.type === 'checkbox' && row.options) {
                        initialData[row.key] = row.options.map(() => false);
                    } else {
                        initialData[row.key] = '';
                    }
                }
            });
        });
        setModel(initialData);
    }, [body]);*/

    /*const validateField = (key: string, value: any): string[] => {
        const rules = body.columns.flatMap(column => column.rows.find(row => row.key === key)?.validate || []);
        return rules.reduce((acc, rule) => {
            if (!rule.rule(value, model)) {
                acc.push(rule.message);
            }
            return acc;
        }, [] as string[]);
    };*/

    /*const validateField = (key: string, value: any, validators: ValidatorFn[]): { [key: string]: any }[] => {
        const errors = validators.map(validator => validator(value)).filter((error): error is { [key: string]: any } => error !== null);
        return errors;
    };*/

    React.useEffect(() => {
        if(isUndefinedOrNull(body.validationRequired)) {
            body.validationRequired = true;
        }
        if(!cssFramework) {
            cssFramework = 'bootstrap';
        }
        if(!CSS_FRAMEWORK[cssFramework]) {
            throw new Error(`CSS Framework ${cssFramework} is not found. Please select a available framework`);
        }
        const isLabelControlsHorizontal: boolean = isUndefinedOrNull(body.isLabelControlsHorizontal) ? false : body.isLabelControlsHorizontal;
        setCssDefaults({...CSS_FRAMEWORK[cssFramework], isLabelControlsHorizontal: isLabelControlsHorizontal });
    },[]);

    React.useEffect(() => {
        if(body.validationRequired && !validateOnSubmit && model) {
            getErrors();
        }
    }, [model]);

    const getErrors = () => {
        const errorsClone: ErrorType = {};
        body.columns.map((column: ColumnType<T>) => {
            if(column.rows && column.rows.length > 0) {
                column.rows.map((setting: FormControlType<T>) => {
                    let validators: ValidatorType<T, any>[] | undefined = setting.validators;
                    //not adding as we dont know if users want to add there own validators and also required property can be a equation hence 
                    //we dont know if users added Validators.required() or below code did it.
                    /*if(setting.required) {
                        if(!validators || validators.length === 0) {
                            validators = [];
                        }
                        const existingVal = validators.filter(validator => {
                            if(validator.type === "required") {
                                return true;
                            }
                            return false;
                        });
                        if(!existingVal || existingVal.length === 0) {
                            //validators.push(Validators.required);
                            //making required 1st Validator
                            validators = [Validators.required(), ...validators];
                        }
                    }*/
                    if(validators && validators.length > 0) {
                        const key = setting.key as keyof T;
                        const value = model[key];
                        const fieldErrors: ValidationRule[] = validateField(model, key, value, validators);
                        //const fieldErrors = validateField(setting.key, val);
                        //setErrors(prev => ({ ...prev, [setting.key]: fieldErrors }));
                        if(fieldErrors && fieldErrors.length > 0) {
                            errorsClone[key as string] = fieldErrors;
                        }
                    }
                });
            }
        });
        //always update errors so that old errors can go away
        setErrors({...errorsClone});
        return errorsClone;
    };

    const validateField = (modelClone: T, key: keyof T, value: any, validators: ValidatorType<T,any>[]): ValidationRule[] => {
        const errors: ValidationRule[] = [];
        validators.forEach((validator: ValidatorType<T,any>)  => {
            const error: ValidationRule = validator.validate(value, modelClone, key);
            if(error && !error.valid) {
                errors.push(error);
            }
        });
          
        return errors
    };
    const handleChange = (event: unknown, setting: FormControlType<T>) => {
        let value = null;
        let type: string = '';
        let val: any = ''; 
        if(isEventObject(event)) {
            const evt: React.ChangeEvent<any> = (event as unknown as React.ChangeEvent<any>);
            value = evt.target.value;
            type = evt.target.type;
            if (type === 'checkbox') {
                val = (evt.target as HTMLInputElement).checked;
            } else {
                val = value;
            }
        }
        else {
            val = event;
        }
        const modelClone: T = { ...model };
        const key = setting.key as keyof T;
        //modelClone[key] = val;

        const setValueByPath = (obj: any, path: string, value: any) => {
            const keys = path.split(/[\.\[\]]/).filter(Boolean);
            let temp = obj;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!(key in temp)) {
                    // Create an empty object or array if the path does not exist
                    temp[key] = isNaN(Number(keys[i + 1])) ? {} : [];
                }
                temp = temp[key];
            }
            temp[keys[keys.length - 1]] = value;
        };
        setValueByPath(modelClone, key as string, val);
        
        if(onChange) {
            onChange(event, key, val, modelClone);
        }
        if(setting.onChange) {
            setting.onChange(event, val, modelClone);
        }
        setModel(modelClone);
        //setModel(prev => ({ ...prev, [name]: val }));
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => {
        const id = event.currentTarget.id;
        if(onClick) {
            const key = setting.key as keyof T;
            onClick(event, key, id, model);
        }
        if(setting.onClick) {
            setting.onClick(event, setting.key, id, model);
        }
    };

    const handleRef = (setting: FormControlType<T>) => (node: any) => {
        if (node) {
            const key = setting.key as keyof T;
            setRef && setRef(node, key);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const objErrors: ErrorType = getErrors();
        if(!objErrors || Object.keys(objErrors).length === 0) {
            console.log('Form submitted:', model);
        }
        else {
            console.log('Form has validation errors:', objErrors);
        }
    };

    const containerClass = cssDefaults.container + (body.containerClass ? ' ' + body.containerClass : '');
    return (
        <form className={containerClass} onSubmit={handleSubmit} noValidate={body.validationRequired}>
            {(cssDefaults && Object.keys(cssDefaults).length > 0) && (
                <>
                    <HeaderControl cssDefaults={cssDefaults} header={header} model={model} errors={errors} 
                                getCustomControls={getCustomControls}
                                handleChange={handleChange} handleRef={handleRef} handleClick={handleClick} />
                    <BodyControl cssDefaults={cssDefaults} body={body} model={model} errors={errors} 
                                getCustomControls={getCustomControls}
                                handleChange={handleChange} handleRef={handleRef} handleClick={handleClick} />
                    <FooterControl cssDefaults={cssDefaults} footer={footer} model={model} errors={errors} 
                                getCustomControls={getCustomControls}
                                handleChange={handleChange} handleRef={handleRef} handleClick={handleClick} />
                 </>
            )}
        </form>
    );
};

export default DynamicForm;