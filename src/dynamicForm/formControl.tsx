import React from 'react';
import { CONTROL_INITIAL, LABEL_INITIAL } from './constants';
import { renderControl } from './controlsHelper';
import { ColClassesType, CustomControlCallback, ErrorType, FormControlType } from './types';
import { asString, doRenderLabel, evaluateExpression, getContainerColumnClassName, getControlClassName, isUndefined } from './utils';

interface FormControlProps<T> {
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>,
    cssMap: Record<string,unknown>,
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
    parentSetting: ColClassesType;
    setting: FormControlType<T>;
    model: T;
    index: number;
    errors: ErrorType;
    isLabelControlsHorizontal: boolean;
    getCustomControls?: CustomControlCallback<T>;
}

const FormControl = <T extends {}>({cssDefaults, cssMap, handleChange, handleRef, handleClick, parentSetting, setting, model, index: controlIndex, errors, 
                                    isLabelControlsHorizontal, getCustomControls }: FormControlProps<T>): JSX.Element => {
                                        
    const key: string = String(setting.key);
    return (
        <>
            {(isUndefined(setting.hide) || !evaluateExpression(setting.hide, model, true)) && (
                <>
                    {isLabelControlsHorizontal && (
                        <div key={controlIndex} className={`control-${key} ${getContainerColumnClassName(setting, asString(cssDefaults.cssClassInitial))}`}>
                            <div className={asString(cssMap.horizontalControlsContainer)}>
                                {doRenderLabel(setting) && (
                                    <label htmlFor={setting.name} className={`${asString(cssMap.horizontalLabel)} 
                                        ${getControlClassName(setting, parentSetting, LABEL_INITIAL, asString(cssDefaults.cssClassInitial))}`}>
                                        {setting.label}
                                    </label>
                                )}
                                <div className={`${getControlClassName(setting, parentSetting, CONTROL_INITIAL, asString(cssDefaults.cssClassInitial))}`}>
                                    {renderControl(cssDefaults, setting, model, controlIndex, errors, handleChange, handleRef, handleClick, getCustomControls)}
                                    {setting.additionalInfo && (
                                        <small className={asString(cssDefaults.additionalInfo)}>{setting.additionalInfo}</small>
                                    )}
                                    {errors[key] && errors[key].map((error, i) => (
                                        <div key={i} className={`error-${key} ${asString(cssMap.error)}`}>{error.message}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {!isLabelControlsHorizontal && (
                        <div key={controlIndex} className={`control-${key} ${getContainerColumnClassName(setting, asString(cssDefaults.cssClassInitial))}`}>
                            <div className={asString(cssMap.verticalControlsContainer)}>
                                {doRenderLabel(setting) && (
                                    <label htmlFor={setting.name} className={asString(cssMap.verticalLabel)}>
                                        {setting.label}
                                    </label>
                                )}
                                {renderControl(cssDefaults, setting, model, controlIndex, errors, handleChange, handleRef, handleClick, getCustomControls)}
                                {setting.additionalInfo && (
                                        <small className={asString(cssDefaults.additionalInfo)}>{setting.additionalInfo}</small>
                                )}
                                {errors[key] && errors[key].map((error, i) => (
                                    <div key={i} className={`error-${key} ${asString(cssMap.error)}`}>{error.message}</div>
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