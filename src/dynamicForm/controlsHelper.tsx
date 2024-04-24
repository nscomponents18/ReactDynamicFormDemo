import React, { ChangeEvent } from 'react';
import { ColClassesType, CustomControlCallback, ErrorType, FormControlType } from './types';
import { getClassNameForControl, getClassNames, getKeyForControlMap, isUndefinedOrNull } from './utils';

export const getDefaultControl = <T,>(
    controlType: string,
    model: T,
    index: number,
    errors: ErrorType,
    handleChange: (event: unknown, setting: FormControlType<T>) => void,
    handleRef: (setting: FormControlType<T>) => (node: any) => void,
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void,
    setting: FormControlType<T>,
    parentSetting: ColClassesType | null
  ): JSX.Element => {
    const controls: { [key: string]: JSX.Element } = {
      'select': (
          <select {...setting.controlProps || {}} className={getClassNameForControl('form-control', setting, errors)} disabled={setting.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(model[setting.key]) ? '' : (model[setting.key] as string)}
              onChange={e => handleChange(e as ChangeEvent<HTMLSelectElement>, setting)} required={setting.required}>
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
          <input {...setting.controlProps || {}} className={getClassNameForControl('form-control', setting, errors)} type={setting.type}
              placeholder={setting.placeholder} disabled={setting.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(model[setting.key]) ? '' : (model[setting.key] as string) }
              onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={setting.required} />
      ),
      'radio': (
          <>
              {setting.options?.map(option => (
                  <div key={option.key} className="form-check">
                      <input {...setting.controlProps || {}} className={getClassNameForControl('form-check-input', setting, errors)}
                          disabled={setting.disabled}
                          ref={setting.refRequired ? handleRef(setting) : null}
                          type="radio" name={setting.name} id={setting.id} 
                          value={option.value} checked={model[setting.key] === option.value} 
                          onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={setting.required} />
                      <label className="form-check-label" htmlFor={setting.id}>
                          {option.label}
                      </label>
                  </div>
              ))}
          </>
      ),
      'checkbox': (
          <input {...setting.controlProps || {}} type="checkbox" className={getClassNameForControl('form-check-input', setting, errors)}
                  disabled={setting.disabled}
                  ref={setting.refRequired ? handleRef(setting) : null}
                  name={setting.name} id={setting.id} 
                  checked={isUndefinedOrNull(model[setting.key]) ? false : (model[setting.key] as boolean)} 
                  onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={setting.required} />
      ),
      'line': (
          <hr className="my-4"></hr>
      ),
      'label': (
            <label {...setting.controlProps || {}} className={getClassNameForControl('form-label', setting, errors)}
                ref={setting.refRequired ? handleRef(setting) : null}
                id={setting.id} >
                {setting.label}
            </label>
      ),
      'button': (
            <button {...setting.controlProps || {}} className={getClassNameForControl('btn', setting, errors)}
                disabled={setting.disabled}
                ref={setting.refRequired ? handleRef(setting) : null}
                name={setting.name} id={setting.id}
                onClick={e => handleClick(e, setting)}>
                {setting.label}
            </button>
      ),
      'default': (
          <input {...setting.controlProps || {type: 'text'}} className={getClassNameForControl('form-control', setting, errors)} placeholder={setting.placeholder} 
              disabled={setting.disabled}
              ref={setting.refRequired ? handleRef(setting) : null}
              id={setting.id} name={setting.name} value={isUndefinedOrNull(model[setting.key]) ? '' : (model[setting.key] as string)} 
              onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>, setting)} required={setting.required} />
      )
    };
    const controlKey: string = getKeyForControlMap(controls, controlType);
    const control = controls[controlKey];
    return control;
};

export const getControl = <T,>(
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
    if(getCustomControls) {
        control = getCustomControls(controlType, model, index, errors, handleChange, handleRef, handleClick, setting, parentSetting);
    }
    if(isUndefinedOrNull(control)) {
        control = getDefaultControl(controlType, model, index, errors, handleChange, handleRef, handleClick, setting, parentSetting);
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
    let control: JSX.Element = getControl(setting.type, model, controlIndex, errors, handleChange, handleRef, handleClick, setting, null, getCustomControls);
    return control;
};

export const renderSides =<T,>(
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
                        renderControl(row, model, index, errors, handleChange, handleRef, handleClick, getCustomControls)
                    ))}
                </div>
            )}
        </>
    )
};