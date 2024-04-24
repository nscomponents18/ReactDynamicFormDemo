import React from 'react';
import { CustomControlCallback, ErrorType, FooterConfig, FormControlType, HeaderConfig } from './types';
import FormControl from './formControl';
import { getControl, renderControl, renderSides } from './controlsHelper';
import { getClassNames } from './utils';

interface FooterControlProps<T> {
    footer?: FooterConfig | undefined;
    model: T;
    errors: ErrorType;
    getCustomControls?: CustomControlCallback<T>;
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
}

const FooterControl = <T extends {}>({ footer, model, getCustomControls, 
                    errors, handleChange, handleRef, handleClick }: FooterControlProps<T>): JSX.Element => {
    
    let side = 0;
    let sideWidth = 0;
    if(footer) {
        side = (footer?.leftSideControls?.length ? 1 : 0 ) + (footer?.centerControls?.length ? 1 : 0 ) + (footer?.rightSideControls?.length ? 1 : 0);
        if(side > 0) {
            sideWidth = Math.floor(100 / side);
        } 
    }

    return (
        <>
            {footer && (
                <>
                    {footer?.footerComp && (
                        footer.footerComp
                    )}
                    {!footer.footerComp && (
                        <div className={getClassNames('d-flex w-100 justify-content-between pt-1 mb-3', footer.cssCon)}>
                            {renderSides(footer.leftSideControls,'d-flex flex-row gap-1 justify-content-start w-' + sideWidth,
                                footer.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                            }
                            {renderSides(footer.centerControls,'d-flex flex-row gap-1 justify-content-center w-' + sideWidth,
                                footer.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                            }
                            {renderSides(footer.rightSideControls,'d-flex flex-row gap-1 justify-content-end w-' + sideWidth,
                                footer.cssRightSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                            }
                        </div>
                    )}
                </>
            )}
        </>
        
    )
};
export default FooterControl;