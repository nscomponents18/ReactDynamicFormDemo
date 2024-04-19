import { ColClassesType } from "./types";

export const isUndefinedOrNull = (value: unknown): value is null | undefined => {
    if (value == null) {
        return true;
    }
    return false;
};

export const isUndefined = (val: unknown): val is undefined => {
    if (val === undefined) {
        return true;
    }
    return false;
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isEventObject = (eventCandidate: unknown): eventCandidate is Event | React.SyntheticEvent => {
  return typeof eventCandidate === 'object' &&
    eventCandidate !== null &&
    'currentTarget' in eventCandidate &&
    'target' in eventCandidate &&
    typeof (eventCandidate as Event).stopPropagation === 'function' &&
    typeof (eventCandidate as Event).preventDefault === 'function' &&
    ('isDefaultPrevented' in eventCandidate && typeof (eventCandidate as React.SyntheticEvent).isDefaultPrevented === 'function') &&
    ('isPropagationStopped' in eventCandidate && typeof (eventCandidate as React.SyntheticEvent).isPropagationStopped === 'function');
}


export const getColumnClassName = (colClassesType: ColClassesType): string => {
  let cssClass: string = '';
  if(colClassesType.colsm) {
    cssClass += `col-sm-${colClassesType.colsm}`;
  }
  if(cssClass.length > 0) {
    cssClass += ' ';
  }
  if(colClassesType.colmd) {
    cssClass += `col-md-${colClassesType.colmd}`;
  }
  if(cssClass.length > 0) {
    cssClass += ' ';
  }
  if(colClassesType.colxs) {
    cssClass += `col-xs-${colClassesType.colxs}`;
  }
  cssClass = cssClass.trim();
  return cssClass;
};

