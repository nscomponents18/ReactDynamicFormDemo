import React, { ChangeEvent } from 'react';
import { ErrorType, FormControlType } from './types';
import { getColumnClassName } from './utils';

interface FormControlProps<T> {
    handleChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    setting: FormControlType<T>;
    model: any;
    index: number;
    errors: ErrorType;
}

const FormControl = <T extends {}>({handleChange, handleRef, setting, model, index: controlIndex, errors}: FormControlProps<T>): JSX.Element => {
    const renderControl = () => {
        switch (setting.type.toLowerCase()) {
            case 'select':
                return (
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
                );
            case 'text':
            case 'number':
                return (
                    <input className="form-control" {...setting.controlProps || {}} type={setting.type} 
                    placeholder={setting.placeholder} disabled={setting.disabled}
                    ref={setting.refRequired ? handleRef(setting) : null}
                    id={setting.id} name={setting.name} value={model[setting.key]} 
                    onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
                );
            case 'radio':
                return (
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
                );
            case 'checkbox':
                return (
                    <input className="form-check-input" type="checkbox" {...setting.controlProps || {}} 
                        disabled={setting.disabled}
                        ref={setting.refRequired ? handleRef(setting) : null}
                        name={setting.name} id={setting.id} 
                        checked={model[setting.key]} 
                        onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
                );
            case 'component':
                if (setting.component) {
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
                }
                else {
                    console.error('Component not provided in settings');
                    return <div>Component not provided in settings</div>;
                }
            default:
                return (
                    <input className="form-control" {...setting.controlProps || {type: 'text'}} placeholder={setting.placeholder} 
                    disabled={setting.disabled}
                    ref={setting.refRequired ? handleRef(setting) : null}
                    id={setting.id} name={setting.name} value={model[setting.key]} 
                    onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} />
                );
        }
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
