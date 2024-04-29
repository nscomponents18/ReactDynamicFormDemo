import React from 'react';
import { getControl } from './controlsHelper';
import FormControl from './formControl';
import { ColumnType, CustomControlCallback, ErrorType, FormConfigType, FormControlType } from './types';
import { asBoolean, asString, getContainerColumnClassName, isUndefinedOrNull } from './utils';

interface BodyControlProps<T> {
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>;
    body: FormConfigType;
    model: T;
    errors: ErrorType;
    getCustomControls?: CustomControlCallback<T>;
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
}

const BodyControl = <T extends {}>({ cssDefaults, body, model, getCustomControls, 
                    errors, handleChange, handleRef, handleClick  }: BodyControlProps<T>): JSX.Element => {
    
    const isLabelControlsHorizontal: boolean = asBoolean(cssDefaults.isLabelControlsHorizontal);
    const cssBody: Record<string,unknown> = cssDefaults.body as Record<string,unknown>;
    return (
        <div className={asString(cssBody.container)}>
            {body.columns.map((column: ColumnType, parentIndex: number) => (
                <div key={parentIndex} className={getContainerColumnClassName(column, asString(cssDefaults.cssClassInitial))}>
                    {column.rows && column.rows.length > 0 && (
                            <div className={asString(cssBody.horizontalContainer)}>
                                {column.rows.map((row: FormControlType<T>, index: number) => (
                                    <FormControl key={index} index={index} cssMap={cssBody} cssDefaults={cssDefaults} setting={row} parentSetting={column} errors={errors} model={model} 
                                        isLabelControlsHorizontal={isLabelControlsHorizontal}
                                        handleChange={handleChange} handleRef={handleRef} handleClick={handleClick}
                                        getCustomControls={getCustomControls} />
                                ))}
                            </div>
                    )}
                    {(!column.rows || column.rows.length === 0) && column.type && (
                        <>
                            {
                                (() => {
                                    const setting: FormControlType<T>  = {...{type: column.type, key: column.type as keyof T}, ...column};
                                    return getControl(cssDefaults, column.type, model, -1, errors, handleChange, handleRef, handleClick, setting, setting, getCustomControls);
                                })()
                            }
                        </>
                    )}
                </div>
            ))}
        </div>
    )
};
export default BodyControl;