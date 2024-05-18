import React, { ChangeEvent } from 'react';
import { asBoolean, asString, containsSpecialCharacter, evaluateExpression, getClassNameForControl, getClassNames, getKeyForControlMap, isString, isUndefinedOrNull } from './utils';
import { ErrorType } from '../interfaces/validationTypes';
import { FormControlType } from '../interfaces/formControlType';
import { ColClassesType } from '../interfaces/colClassesType';
import { DEFAULT_LABEL_FIELD, EVALUATE_EXPRESSION_ERROR_VALUE } from '../constants';
import { CustomControlCallback } from '../interfaces/customControlCallback';
import { CalculatedFields } from '../interfaces/calculatedFields';

export const getDefaultControl = <T,>(
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>,
    controlType: string,
    model: T,
    index: number,
    errors: ErrorType,
    handleChange: (event: unknown, setting: FormControlType<T>) => void,
    handleRef: (setting: FormControlType<T>) => (node: any) => void,
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
    setting: FormControlType<T>,
    parentSetting: ColClassesType | null,
    calcFields: CalculatedFields<T>
  ): JSX.Element => {
    
    const controls: { [key: string]: JSX.Element } = {
      'select': (
          <select {...setting.controlProps || {}} className={getClassNameForControl(asString(cssDefaults.control), setting, errors)} disabled={calcFields.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(calcFields.value) ? '' : (calcFields.value as string)}
              onChange={e => handleChange(e as ChangeEvent<HTMLSelectElement>, setting)} required={calcFields.required}>
              {getSelectOptions(setting)}
          </select>
        ),
        //can separate text,number but its easier so that we can other types 
        //which can return same input so that if we change any attribute in input its an one place
        //from https://www.w3schools.com/html/html_form_input_types.asp
        'text,number,email,color,date,datetime-local,file,hidden,image,month,password,range,reset,search,tel,time,url,week': (
          <input {...setting.controlProps || {}} className={getClassNameForControl(asString(cssDefaults.control), setting, errors)} type={setting.type}
              placeholder={setting.placeholder} disabled={calcFields.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(calcFields.value) ? '' : (calcFields.value as string) }
              onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={calcFields.required} />
        ),
        'textarea': (
            <textarea {...setting.controlProps || {}} className={getClassNameForControl(asString(cssDefaults.control), setting, errors)}
                placeholder={setting.placeholder} disabled={calcFields.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} name={setting.name} value={isUndefinedOrNull(calcFields.value) ? '' : (calcFields.value as string) }
                onChange={e => handleChange(e as ChangeEvent<HTMLTextAreaElement>, setting)} required={calcFields.required} />
        ),
        'radio': (
            <>
                {getOptions(setting) ? (
                    setting.options?.map((option, index) => (
                        <div key={`${index}-${option}`} 
                            className={asString(calcFields.isLabelControlsHorizontal ? cssDefaults.checkBoxContinerHorizontal : cssDefaults.checkBoxContinerVertical)}>
                            <input {...(setting.controlProps || {})} className={getClassNameForControl(asString(cssDefaults.checkBoxRadio), setting, errors)}
                                disabled={calcFields.disabled}
                                ref={setting.refRequired ? handleRef(setting) : null}
                                type="radio" name={setting.name} id={setting.id} 
                                value={asString(option)} checked={calcFields.value === option} 
                                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={calcFields.required} />
                            <label className={asString(cssDefaults.checkBoxLabel)} htmlFor={setting.id}>
                                {asString(option)}
                            </label>
                        </div>
                    ))
                ) : (
                        setting.options?.map((optionParam, index) => {
                            const option: Record<string, unknown> = optionParam as Record<string, unknown>;
                            const optionId: string | undefined = (option?.id ? (option.id as string) : setting.id);
                            return (<div key={`${index}-${asString(option[asString(setting.valueField)])}`} 
                                className={asString(calcFields.isLabelControlsHorizontal ? cssDefaults.checkBoxContinerHorizontal : cssDefaults.checkBoxContinerVertical)}>
                                <input {...(setting.controlProps || {})} className={getClassNameForControl(asString(cssDefaults.checkBoxRadio), setting, errors)
                                    }
                                    disabled={calcFields.disabled}
                                    ref={setting.refRequired ? handleRef(setting) : null}
                                    type="radio" name={setting.name} id={optionId} 
                                    value={asString(option[asString(setting.valueField)])} checked={calcFields.value === option[asString(setting.valueField)]} 
                                    onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={calcFields.required} />
                                <label className={asString(cssDefaults.checkBoxLabel)} htmlFor={optionId}>
                                    {asString(option[asString(setting.labelField)])}
                                </label>
                            </div>
                        )}
                    )
                )}
            </>
        ),    
      'checkbox': (
            <div className={asString(calcFields.isLabelControlsHorizontal ? cssDefaults.checkBoxContinerHorizontal : cssDefaults.checkBoxContinerVertical)}>
                <input {...setting.controlProps || {}} type="checkbox" className={getClassNameForControl(asString(cssDefaults.checkBoxRadio), setting, errors)}
                        disabled={calcFields.disabled}
                        ref={setting.refRequired ? handleRef(setting) : null}
                        name={setting.name} id={setting.id} 
                        checked={isUndefinedOrNull(calcFields.value) ? false : (calcFields.value as boolean)} 
                        onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={calcFields.required} />
                {setting.label && (
                    <label className={asString(cssDefaults.checkBoxLabel)} htmlFor={setting.id}>
                        {setting.label}
                    </label>
                )}
            </div>
      ),
      'line': (
          <hr className={asString(cssDefaults.line)}></hr>
      ),
      'header': (
        <h4 className={getClassNameForControl(asString(cssDefaults.miniHeader), setting, errors)}>{setting.label}</h4>
      ),
      'label': (
            <label {...setting.controlProps || {}} className={getClassNameForControl(asString(cssDefaults.label), setting, errors)}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} >
                {setting.label}
            </label>
      ),
      'button': (
            <button {...setting.controlProps || {}} className={getClassNameForControl('btn', setting, errors)}
                disabled={calcFields.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                name={setting.name} id={setting.id}
                onClick={e => handleClick(e, setting)}>
                {setting.label}
            </button>
      ),
      'default': (
          <input {...setting.controlProps || {type: 'text'}} className={getClassNameForControl(asString(cssDefaults.control), setting, errors)} placeholder={setting.placeholder} 
              disabled={calcFields.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(calcFields.value) ? '' : (calcFields.value as string)} 
              onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={calcFields.required} />
      )
    };
    const controlKey: string = getKeyForControlMap(controls, controlType);
    const control = controls[controlKey];
    return control;
};

const getSelectOptions = <T,>(setting: FormControlType<T>) => {
    const isOptionString = getOptions(setting);
    return (
        <>
            {isOptionString && setting.options?.map((option, index) => (
                <option key={`${index}-${option}`} value={asString(option)}>
                    {asString(option)}
                </option>
            ))}
            {!isOptionString && setting.options?.map((optionParam, index) => {
                const option: Record<string, unknown> = optionParam as Record<string, unknown>;
                return (
                    <option key={`${index}-${asString(option[asString(setting.valueField)])}`} value={asString(option[asString(setting.valueField)])}>
                        {asString(option[asString(setting.labelField)])}
                    </option>
                );
            })}
        </>
    );
};

const getOptions = <T,>(setting: FormControlType<T>) => {
    let isOptionString = true;
    if(setting.options && setting.options.length > 0) {
        if(!setting.labelField) {
            setting.labelField = DEFAULT_LABEL_FIELD;
        }
        if(!setting.valueField) {
            setting.valueField = setting.labelField;
        }
        isOptionString = isString(setting.options[0]);
    }
    else {
        setting.options = [];
    }
    return isOptionString;
};

export const getControl = <T,>(
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>,
    controlType: string,
    model: T,
    index: number,
    errors: ErrorType,
    handleChange: (event: unknown, setting: FormControlType<T>) => void,
    handleRef: (setting: FormControlType<T>) => (node: any) => void,
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
    setting: FormControlType<T>,
    parentSetting: ColClassesType | null,
    getCustomControls: CustomControlCallback<T> | undefined
  ): JSX.Element => {
    let control: JSX.Element | null = null;
    const isLabelControlsHorizontal: boolean = asBoolean(cssDefaults.isLabelControlsHorizontal);
    const disabled = asBoolean(evaluateExpression(setting.disabled, model, false)); 
    const required = asBoolean(evaluateExpression(setting.required, model, false));
    if(setting.key === 'manager[0].name') {
        console.log("here");
    }
    let value = null;
    if(containsSpecialCharacter(setting.key)) {
        value = (evaluateExpression(setting.key, model, null, EVALUATE_EXPRESSION_ERROR_VALUE) as T[keyof T] | null | undefined);
        if(value === EVALUATE_EXPRESSION_ERROR_VALUE) {
            value = model[setting.key as keyof T];
        }
    }
    else {
        value = model[setting.key as keyof T];
    }
    const calcFields: CalculatedFields<T> = {isLabelControlsHorizontal, disabled, required, value};
    if(getCustomControls) {
        control = getCustomControls(controlType, model, index, errors, handleChange, handleRef, handleClick, setting, parentSetting, calcFields);
    }
    if(isUndefinedOrNull(control)) {
        control = getDefaultControl(cssDefaults, controlType, model, index, errors, handleChange, handleRef, handleClick, setting, parentSetting, calcFields);
        if (control) {
            return control;
        } else {
            console.error(`Control type "${controlType}" not supported`);
            return <div>Control type not {controlType} supported</div>;
        }
    }
    return control;
  };

export const renderControl =<T,>(
        cssDefaults: Record<string,string | boolean | Record<string,unknown>>,
        setting: FormControlType<T>, 
        model: T, 
        controlIndex: number,
        errors: ErrorType,
        handleChange: (event: unknown, setting: FormControlType<T>) => void,
        handleRef: (setting: FormControlType<T>) => (node: any) => void,
        handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
        getCustomControls: CustomControlCallback<T> | undefined
    ): JSX.Element => {
    const controlType = setting.type.toLowerCase();
    if(controlType === 'component' && setting.component) {
        const disabled = asBoolean(evaluateExpression(setting.disabled, model, false));
        const value = model[setting.key as keyof T];
        const DynamicComponent = setting.component;
        return (
            <DynamicComponent
                className={asString(cssDefaults.control)}
                {...setting.controlProps || {}} 
                disabled={disabled}
                ref={setting.refRequired ? handleRef(setting) : undefined}
                id={setting.id}
                name={setting.name}
                value={value}
                model={model}
                onChange={(e: any) => handleChange(e, setting)}
            />
        );
    }
    let control: JSX.Element = getControl(cssDefaults,setting.type, model, controlIndex, errors, handleChange, handleRef, handleClick, setting, null, getCustomControls);
    return control;
};

export const renderSides =<T,>(
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>,
    sideControls: FormControlType<T>[] | undefined,
    defaultConClass: string | null, 
    extraConClasses: string | string[] | undefined | null,
    model: T, 
    errors: ErrorType,
    handleChange: (event: unknown, setting: FormControlType<T>) => void,
    handleRef: (setting: FormControlType<T>) => (node: any) => void,
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
    getCustomControls: CustomControlCallback<T> | undefined
): JSX.Element => {
    return (
        <>
            {sideControls && sideControls.length > 0 && (
                <div className={getClassNames(defaultConClass, extraConClasses)}>
                    {sideControls.map((row: FormControlType<T>, index: number) => (
                        renderControl(cssDefaults,row, model, index, errors, handleChange, handleRef, handleClick, getCustomControls)
                    ))}
                </div>
            )}
        </>
    )
};