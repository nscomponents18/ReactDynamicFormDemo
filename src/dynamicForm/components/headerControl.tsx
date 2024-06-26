import React from 'react';
import { renderSides } from '../utils/controlsHelper';
import { asString, getClassNames } from '../utils/utils';
import { HeaderConfig } from '../interfaces/headerConfig';
import { ErrorType } from '../interfaces/validationTypes';
import { CustomControlCallback } from '../interfaces/customControlCallback';
import { FormControlType } from '../interfaces/formControlType';

interface HeaderControlProps<T> {
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>;
    header?: HeaderConfig<T>;
    model: T;
    errors: ErrorType;
    getCustomControls?: CustomControlCallback<T>;
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
}

const HeaderControl = <T extends {}>({cssDefaults, header, model, getCustomControls, 
                    errors, handleChange, handleRef, handleClick }: HeaderControlProps<T>): JSX.Element => {
    
    let side = 0;
    let sideWidth = 0;
    if(header) {
        side = (header?.leftSideControls?.length ? 1 : 0 ) + (header?.rightSideControls?.length ? 1 : 0);
        if(side > 0) {
            sideWidth = Math.floor(100 / side);
        } 
    }

    const cssHeader: Record<string,unknown> = cssDefaults.header as Record<string,unknown>;
    return (
        <>
            {header && (
                <>
                    {header?.headerComp && (
                        header.headerComp
                    )}
                    {!header.headerComp && (
                        <div className={asString(cssHeader.container)}>
                            <div className={getClassNames(asString(cssHeader.titleContainer), header.cssTitleCon)}>
                                <h3 className={getClassNames(asString(cssHeader.title), header.cssTitle)}>{header.title}</h3>
                            </div>
                            <div className={getClassNames(asString(cssHeader.nonTitleContainer), header.cssNonTitleCon)}>
                                {renderSides(cssDefaults, header.leftSideControls, (cssHeader.leftSideContainer as (sideWidth: number) => string)(sideWidth),
                                    header.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                                }
                                {renderSides(cssDefaults, header.rightSideControls,(cssHeader.rightSideContainer as (sideWidth: number) => string)(sideWidth),
                                    header.cssRightSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                                }
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
};
export default HeaderControl;