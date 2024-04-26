import React from 'react';
import { renderSides } from './controlsHelper';
import { CustomControlCallback, ErrorType, FooterConfig, FormControlType } from './types';
import { asString, getClassNames } from './utils';

interface FooterControlProps<T> {
    cssDefaults: Record<string,string | boolean | Record<string,unknown>>;
    footer?: FooterConfig | undefined;
    model: T;
    errors: ErrorType;
    getCustomControls?: CustomControlCallback<T>;
    handleChange: (event: unknown, setting: FormControlType<T>) => void;
    handleRef: (setting: FormControlType<T>) => (node: any) => void;
    handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<T>) => void;
}

const FooterControl = <T extends {}>({cssDefaults, footer, model, getCustomControls, 
                    errors, handleChange, handleRef, handleClick }: FooterControlProps<T>): JSX.Element => {
    
    let side = 0;
    let sideWidth = 0;
    if(footer) {
        side = (footer?.leftSideControls?.length ? 1 : 0 ) + (footer?.centerControls?.length ? 1 : 0 ) + (footer?.rightSideControls?.length ? 1 : 0);
        if(side > 0) {
            sideWidth = Math.floor(100 / side);
        } 
    }

    const cssFooter: Record<string,unknown> = cssDefaults.footer as Record<string,unknown>;
    return (
        <>
            {footer && (
                <>
                    {footer?.footerComp && (
                        footer.footerComp
                    )}
                    {!footer.footerComp && (
                        <div className={getClassNames(asString(cssFooter.container), footer.cssCon)}>
                            {renderSides(cssDefaults, footer.leftSideControls,(cssFooter.leftSideContainer as (sideWidth: number) => string)(sideWidth),
                                footer.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                            }
                            {renderSides(cssDefaults, footer.centerControls,(cssFooter.centerContainer as (sideWidth: number) => string)(sideWidth),
                                footer.cssLeftSideCon, model, errors, handleChange, handleRef, handleClick, getCustomControls)
                            }
                            {renderSides(cssDefaults, footer.rightSideControls,(cssFooter.rightSideContainer as (sideWidth: number) => string)(sideWidth),
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