import React from 'react';
import { COL, CONTROL_INITIAL, LABEL_INITIAL } from './constants';
import { getControl, renderControl } from './controlsHelper';
import { ColClassesType, CustomControlCallback, ErrorType, FormControlType } from './types';
import { getContainerColumnClassName, getControlClassName } from './utils';

interface FormControlProps<T> {
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
    parentSetting: ColClassesType;
    setting: FormControlType<T>;
    model: any;
    index: number;
    errors: ErrorType;
    isLabelControlsHorizontal: boolean;
    getCustomControls?: CustomControlCallback<T>;
}

const FormControl = <T extends {}>({ handleChange, handleRef, handleClick, parentSetting, setting, model, index: controlIndex, errors, 
                                    isLabelControlsHorizontal, getCustomControls }: FormControlProps<T>): JSX.Element => {
                                        
    const key: string = String(setting.key);
    return (
        <>
            {!setting.hide && (
                <>
                    {isLabelControlsHorizontal && (
                        <div key={controlIndex} className={`control-${key} ${getContainerColumnClassName(setting)}`}>
                            <div className='form-group row'>
                                {setting.label && <label htmlFor={setting.name} className={`col-form-label ${getControlClassName(setting, parentSetting, LABEL_INITIAL, COL)}`}>{setting.label}</label>}
                                <div className={`${getControlClassName(setting, parentSetting, CONTROL_INITIAL, COL)}`}>
                                    {renderControl(setting, model, controlIndex, errors, handleChange, handleRef, handleClick, getCustomControls)}
                                    {errors[key] && errors[key].map((error, i) => (
                                        <div key={i} className="error-message">{error.message}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLabelControlsHorizontal && (
                        <div key={controlIndex} className={`control-${key} ${getContainerColumnClassName(setting)}`}>
                            <div className='form-group'>
                                {setting.label && <label htmlFor={setting.name} className='form-label'>{setting.label}</label>}
                                {renderControl(setting, model, controlIndex, errors, handleChange, handleRef, handleClick, getCustomControls)}
                                {errors[key] && errors[key].map((error, i) => (
                                    <div key={i} className="error-message">{error.message}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default FormControl;