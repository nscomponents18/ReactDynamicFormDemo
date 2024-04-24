import React from 'react';
import { CustomControlCallback, ErrorType, FormControlType, HeaderConfig } from './types';
import FormControl from './formControl';
import { getControl, renderControl, renderSides } from './controlsHelper';
import { getClassNames } from './utils';

interface HeaderControlProps<T> {
    header?: HeaderConfig;
    model: T;
    errors: ErrorType;
    getCustomControls?: CustomControlCallback<T>;
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
}

const HeaderControl = <T extends {}>({ header, model, getCustomControls, 
                    errors, handleChange, handleRef, handleClick }: HeaderControlProps<T>): JSX.Element => {
    
    let side = 0;
    let sideWidth = 0;
    if(header) {
        side = (header?.leftSideControls?.length ? 1 : 0 ) + (header?.rightSideControls?.length ? 1 : 0);
        if(side > 0) {
            sideWidth = Math.floor(100 / side);
        } 
    }

    return (
        <>
            {header && (
                <>
                    {header?.headerComp && (
                        header.headerComp
                    )}
                    {!header.headerComp && (
                        <div className='d-flex w-100 pt-1 mb-3'>
                            <div className={getClassNames('w-20', header.cssTitleCon)}>
                                <h3 className={getClassNames('h3', header.cssTitle)}>{header.title}</h3>
                            </div>
                            <div className={getClassNames('d-flex w-80 justify-content-between', header.cssNonTitleCon)}>
                                {renderSides(header.leftSideControls,'d-flex flex-row gap-1 justify-content-start w-' + sideWidth,
                                    header.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                                }
                                {renderSides(header.rightSideControls,'d-flex flex-row gap-1 justify-content-end w-' + sideWidth,
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