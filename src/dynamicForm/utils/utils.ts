import { CONTAINER_INITIAL } from "../constants";
import { ColClassesType } from "../interfaces/colClassesType";
import { ColumnType } from "../interfaces/columnType";
import { FormControlType } from "../interfaces/formControlType";
import { ErrorType } from "../interfaces/validationTypes";


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

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
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


export const getContainerColumnClassName = (colClassesType: ColClassesType, classInitial: string): string => {
  let cssClass: string[] = [];
  cssClass = getClassNamesForInitails(colClassesType, null , CONTAINER_INITIAL, classInitial);
  if(colClassesType.containerclass) {
    cssClass.push(colClassesType.containerclass);
  }
  return cssClass.join(' ');
};

export const getControlClassName = (colClassesType: ColClassesType, parentColClassesType: ColClassesType, cssInitial: string, classInitial: string): string => {
  let cssClass: string[] = [];
  cssClass = getClassNamesForInitails(colClassesType, parentColClassesType, cssInitial, classInitial);
  if(colClassesType.controlcontainerclass) {
    cssClass.push(colClassesType.controlcontainerclass);
  }
  return cssClass.join(' ');
};


export const getClassNamesForInitails = (colClassesType: ColClassesType, parentColClassesType: ColClassesType | null, cssInitial: string, classInitial: string) => {
  const cssClass: string[] = [];
  const childMap: Record<string, number> = {};
  Object.keys(colClassesType).forEach((origKey: string) => {
    const val = colClassesType[origKey as keyof ColClassesType];
    //colClassesType also has other keys for interfaces 
    if(!isUndefinedOrNull(val) && origKey.startsWith(cssInitial)) {
      const key = getClassNameFromProperty(origKey, cssInitial, classInitial);
      cssClass.push(`${key}-${val}`);
      childMap[origKey] = val;
    }
  });
  if(parentColClassesType) {
    Object.keys(parentColClassesType).forEach((origKey: string) => {
      const val = parentColClassesType[origKey as keyof ColClassesType];
      if(!isUndefinedOrNull(val) && origKey.startsWith(cssInitial) && isUndefinedOrNull(childMap[origKey])) {
        const key = getClassNameFromProperty(origKey, cssInitial, classInitial);
        cssClass.push(`${key}-${val}`);
      }
    });
  }
  return cssClass;
};

export const getClassNameFromProperty = (key: string, cssInitial: string, classInitial: string) => {
  key = key.substring(cssInitial.length).toLowerCase();
  if(key.startsWith(classInitial)) {
    const size = key.substring(classInitial.length);
    if(size) {
      return `${classInitial}-${size}`;
    }
    return classInitial;
  }
  return key;
};

export const getClassNameForControl = <T>(defaultClass: string, setting: FormControlType<T>, errors: ErrorType): string => {
  const cssClass: string[] = [];
  if(defaultClass) {
    cssClass.push(defaultClass);
  }
  if(setting.className) {
    cssClass.push(setting.className);
  }
  const key: string = setting.key as string;
  if(errors[key] && errors[key].length > 0) {
    cssClass.push('is-invalid');
  }
  return cssClass.join(' ');
};

export const getKeyForControlMap = (controls: { [key: string]: JSX.Element }, controlType: string): string => {
  if(controls[controlType]) {
      return controlType;
  }
  let retVal: string = 'default';
  Object.keys(controls).forEach((key: string) => {
      if(key.includes(',')) {
          const arrKeys: string[] = key.split(",");
          if(arrKeys.includes(controlType)) {
              retVal = key;
              return;
          }
      }
  });
  return retVal;
};

export const getClassNames = (defaultClass: string | null, extraClasses: string | string[] | undefined | null): string => {
  const cssClass: string[] = [];
  if(defaultClass) {
    cssClass.push(defaultClass);
  }
  if(extraClasses) {
    if(isString(extraClasses)) {
      extraClasses = [extraClasses];
    }
    extraClasses.forEach((cls: string) => {
      if(cls) {
        cssClass.push(cls);
      }
    });
  }
  return cssClass.join(' ');
};

export const asString = (val: unknown) => {
  return (val as string);
};

export const asBoolean = (val: unknown) => {
  return (val as boolean);
};

export const doRenderLabel = <T,>(setting: FormControlType<T>): boolean => {
  const typeWithNoLabels: string[] = ['checkbox', 'header', 'label'];
  if(setting.label && !typeWithNoLabels.includes(setting.type)) {
    return true;
  }
  return false;
};

export const inFraction = (numerator: number, denominator: number): string => {
  if (denominator === 0) {
      throw new Error("Denominator cannot be zero.");
  }

  const gcd = (a: number, b: number): number => {
      return b ? gcd(b, a % b) : a;
  };

  const divisor: number = gcd(numerator, denominator);
  const simplifiedNumerator: number = numerator / divisor;
  const simplifiedDenominator: number = denominator / divisor;

  return `${simplifiedNumerator}/${simplifiedDenominator}`;
};

export const evaluateExpression = <T,>(expression: string | boolean | undefined | null, model: T, defaultValue?: string | boolean | number | undefined | null, errorValue?: string | boolean | number | undefined | null): unknown => {
  /*if(isUndefinedOrNull(defaultValue)) {
    defaultValue = false;
  }*/
  if(isUndefinedOrNull(expression)) {
    return defaultValue;
  }
  if(isBoolean(expression)) {
    return asBoolean(expression);
  }
  if(isString(expression) && model) {
    //const func = new Function('model', `return ${expression};`) as (model: T) => boolean;
    //return func(model);
    try {
      const func = new Function('model', `with (model) { return ${expression}; }`) as (model: T) => boolean;
      const result = func(model);
      return result;
    } catch (error) {
      console.error('Error evaluating expression:', error);
      if(isUndefinedOrNull(errorValue)) {
        return errorValue;
      }
      return defaultValue;
    }
  }
  return defaultValue;
};

export const findFormControl = <T,>(columns: ColumnType<T>[], key: string): FormControlType<T> | ColumnType<T> | null => {
  for (const column of columns) {
    if(column.key === key) {
      return column;
    }
    if (column.rows) {
        for (const row of column.rows) {
            if (row.key === key) {
                return row;
            }
            if(row.columns) {
              const result: FormControlType<T> | ColumnType<T> | null = findFormControl(row.columns, key);
              if (result) {
                  return result;
              }
            }
        }
    }
    if (column.columns) {
        const result = findFormControl(column.columns, key);
        if (result) {
            return result;
        }
    }
  }
  return null;
};

export const containsSpecialCharacter = (str: string | undefined): boolean => {
  if(str) {
    const regex = /[!@#$%^&*(),.?":{}|<>[\]\\]/;
    return regex.test(str);
  }
  return false;
};


