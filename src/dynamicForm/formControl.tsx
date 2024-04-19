import React, { ChangeEvent } from 'react';
import { ErrorType, FormControlType } from './types';
import { getColumnClassName } from './utils';
import ToggleSwitch from '../component/toggleSwitch/toggleSwitch';

interface FormControlProps<T> {
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    setting: FormControlType<T>;
    model: any;
    index: number;
    errors: ErrorType;
}

const FormControl = <T extends {}>({ handleChange, handleRef, setting, model, index: controlIndex, errors }: FormControlProps<T>): JSX.Element => {
    const controls: { [key: string]: JSX.Element } = {
        'select': (
            <select className="form-control" {...setting.controlProps || {}} disabled={setting.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} name={setting.name} value={model[setting.key]}
                onChange={e => handleChange(e as ChangeEvent<HTMLSelectElement>, setting)}>
                {setting.options?.map(option => (
                    <option key={option.key} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ),
        //can separate text,number but its easier so that we can other types 
        //which can return same input so that if we change any attribute in input its an one place
        'text,number': (
            <input className="form-control" {...setting.controlProps || {}} type={setting.type}
                placeholder={setting.placeholder} disabled={setting.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} name={setting.name} value={model[setting.key]}
                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
        ),
        'radio': (
            <>
                {setting.options?.map(option => (
                    <div key={option.key} className="form-check">
                        <input className="form-check-input" {...setting.controlProps || {}}
                            disabled={setting.disabled}
                            ref={setting.refRequired ? handleRef(setting) : null}
                            type="radio" name={setting.name} id={setting.id} 
                            value={option.value} checked={model[setting.key] === option.value} 
                            onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
                        <label className="form-check-label" htmlFor={setting.id}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </>
        ),
        'checkbox': (
            <input className="form-check-input" type="checkbox" {...setting.controlProps || {}} 
                    disabled={setting.disabled}
                    ref={setting.refRequired ? handleRef(setting) : null}
                    name={setting.name} id={setting.id} 
                    checked={model[setting.key]} 
                    onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
        ),
        'toggleswitch': (
            <ToggleSwitch 
                disabled={setting.disabled}
                name={setting.name} id={setting.id} 
                checked={model[setting.key]} 
                onChange={(e: boolean) => handleChange(e, setting)}  />
        ),
        'default': (
            <input className="form-control" {...setting.controlProps || {type: 'text'}} placeholder={setting.placeholder} 
                disabled={setting.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} name={setting.name} value={model[setting.key]} 
                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
        )
    };

    const renderControl = () => {
        const controlType = setting.type.toLowerCase();
        if(controlType === 'component' && setting.component) {
            const DynamicComponent = setting.component;
            return (
                <DynamicComponent
                    className="form-control"
                    {...setting.controlProps || {}} 
                    disabled={setting.disabled}
                    ref={setting.refRequired ? handleRef(setting) : undefined}
                    id={setting.id}
                    name={setting.name}
                    value={model[setting.key]}
                    onChange={(e: any) => handleChange(e, setting)}
                />
            );
        } else {
            const controlKey: string = getKeyForControlMap(controlType);
            const control = controls[controlKey];
            if (control) {
                return control;
            } else {
                console.error(`Control type "${controlType}" not supported`);
                return <div>Control type not supported</div>;
            }
        }
    };

    const getKeyForControlMap = (controlType: string): string => {
        if(controls[controlType]) {
            return controlType;
        }
        let retVal: string = 'default';
        Object.keys(controls).forEach((key: string) => {
            if(key.includes(',')) {
                const arrKeys: string[] = key.split(",");
                if(arrKeys.includes(controlType)) {
                    retVal = key;
                    return;
                }
            }
        });
        return retVal;
    }

    const key: string = String(setting.key);
    return (
        <>
            {!setting.hide && (<div key={controlIndex} className={`form-group control-${key} ${getColumnClassName(setting)}`}>
                <div className='form-control'>
                    {setting.label && <label htmlFor={setting.name}>{setting.label}</label>}
                    {renderControl()}
                    {errors[key] && errors[key].map((error, i) => (
                        <div key={i} className="error-message">{error.message}</div>
                    ))}
                </div>
            </div>
            )}
        </>
    );
};

export default FormControl;