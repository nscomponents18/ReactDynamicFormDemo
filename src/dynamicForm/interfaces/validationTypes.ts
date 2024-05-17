export interface ValidationRule {
    type: string; //if someome wants to handle error accroding to type
    valid: boolean;
    message: string;
    [propName: string]: any;
}

/*export type ValidationResult = { 
    [key: string]: ValidationRule;
};*/

//export type ValidatorType<T> = (value: T) => ValidationResult | null;
export type ValidatorType<T,K> = {
    validate: (value: K, model: T, key: keyof T) => ValidationRule;
    type: string;
};
//export type ValidatorTypeForString = ValidatorType<{ [key: string]: string }, any>;
export type ErrorType = { [key: string]: ValidationRule[] };
export type ValidatorFunction = <T, K>(value: K, model: T, key: keyof T) => ValidationRule;

