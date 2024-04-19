import React from 'react';
import { DynamicFormSetting, ErrorType, FormControlType, ValidationRule, ValidatorType } from './types';
import FormControl from './formControl';
import { getColumnClassName, isEventObject, isUndefined } from './utils';

const DynamicForm = <T extends {}>({ config, model, setModel, onChange, onClick, setRef }: DynamicFormSetting<T>): JSX.Element => {
    //const [model, setModel] = React.useState<T>(defaultValue || {} as T);
    const [errors, setErrors] = React.useState<ErrorType>({});

    /*React.useEffect(() => {
        const initialData: { [key: string]: any } = { ...model };
        config.columns.forEach(column => {
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
    }, [config]);*/

    /*const validateField = (key: string, value: any): string[] => {
        const rules = config.columns.flatMap(column => column.rows.find(row => row.key === key)?.validate || []);
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

    const validateField = (modelClone: T, key: keyof T, value: any, validators: ValidatorType<T,any>[]): ValidationRule[] => {
        const errors: ValidationRule[] = [];
        validators.forEach((validator: ValidatorType<T,any>)  => {
            const error: ValidationRule = validator(value, modelClone, key);
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
        const key: keyof T = setting.key;
        //@ts-ignore
        modelClone[key] = val;
        const validators: ValidatorType<T,any>[] = setting.validators || [];
        const fieldErrors: ValidationRule[] = validateField(modelClone, key, value, validators);
        //const fieldErrors = validateField(setting.key, val);
        //setErrors(prev => ({ ...prev, [setting.key]: fieldErrors }));
        setErrors({ ...errors, [setting.key]: fieldErrors});
        if(onChange) {
            onChange(event, key, val, modelClone);
        }
        if(setting.onChange) {
            setting.onChange(event, val, modelClone);
        }
        setModel(modelClone);
        //setModel(prev => ({ ...prev, [name]: val }));
    };

    const handleRef = (setting: FormControlType<T>) => (node: any) => {
        if (node) {
            setRef && setRef(node, setting.key);
        }
    };

    return (
        <div className="container">
            {config.columns.map((column, index) => (
                <div key={index} className={getColumnClassName(column)}>
                    <div className="row">
                        {column.rows.map((row: FormControlType<T>, index: number) => (
                            <FormControl key={index} index={index} setting={row} errors={errors} model={model} handleChange={handleChange} 
                                handleRef={handleRef} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicForm;