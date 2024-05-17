/*(import { ValidatorType, ValidatorTypeForString } from "./types";


export const Validators = {
    required: (value: string): { required: { valid: boolean, message: string } } | null => {
        return value.trim() === '' ? { required: { valid: false, message: "This field is required." } } : null;
    },
    minLength: (minLength: number): ValidatorTypeForString => {
        return (value: string): { minLength: { requiredLength: number, actualLength: number, valid: boolean, message: string } } | null => {
            if (value.length < minLength) {
                return {
                    minLength: {
                        requiredLength: minLength,
                        actualLength: value.length,
                        valid: false,
                        message: `Minimum length of ${minLength} is required. Current length is ${value.length}.`
                    }
                };
            }
            return null;
        };
    },
    email: (value: string): { email: { valid: boolean, message: string } } | null => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        return !emailRegex.test(value) ? { email: { valid: false, message: "Invalid email format." } } : null;
    }
};*/


/*import { ValidationResult, ValidationRule, ValidatorTypeForString } from "./types";

export const Validators = {
    required: (value: string): ValidationRule => {
        const valid = value.trim() !== '';
        return {
            valid: valid,
            message: valid ? "" : "This field is required."
        };
    },
    minLength: (minLength: number): ValidatorTypeForString => {
        return (value: string): ValidationRule => {
            const valid = value.length >= minLength;
            return {
                valid: valid,
                message: valid ? "" : `Minimum length of ${minLength} is required. Current length is ${value.length}.`,
                requiredLength: minLength,
                actualLength: value.length
            };
        };
    },
    email: (value: string): ValidationRule => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const valid = emailRegex.test(value);
        return {
            valid: valid,
            message: valid ? "" : "Invalid email format."
        };
    }
};*/


import { ValidationRule, ValidatorType } from "../interfaces/validationTypes";
import { isUndefinedOrNull } from "./utils";

export const Validators = {
    required: <T extends Record<string, any>, K extends string | undefined | null>(message?: string): ValidatorType<T, K> => ({
        type: "required",
        validate: (value: K, model: T, key: keyof T): ValidationRule => {
            const val: string = isUndefinedOrNull(value) ? (model[key] as string) : (value as string);
            const valid = val.trim() !== '';
            return {
                type: "required",
                valid: valid,
                message: valid ? "" : message || 'This field is required.'
            };
        }
    }),
    minLength: <T extends Record<string, any>, K extends string | undefined | null>(minLength: number, message?: string): ValidatorType<T, K> => ({
        type: "minLength",
        validate: (value: K, model: T, key: keyof T): ValidationRule => {
            const val: string = isUndefinedOrNull(value) ? (model[key] as string) : (value as string);
            const valid = val.length >= minLength;
            return {
                type: "minLength",
                valid: valid,
                message: valid ? "" : message || `Minimum length of ${minLength} is required. Current length is ${val.length}.`,
                requiredLength: minLength,
                actualLength: val.length
            };
        }
    }),
    email: <T extends Record<string, any>, K extends string | undefined | null>(message?: string): ValidatorType<T, K> => ({
        type: "email",
        validate: (value: K, model: T, key: keyof T): ValidationRule => {
            const val: string = isUndefinedOrNull(value) ? (model[key] as string) : (value as string);
            const emailRegex = /^\S+@\S+\.\S+$/;
            const valid = emailRegex.test(val);
            return {
                type: "email",
                valid: valid,
                message: valid ? "" : message || 'Invalid email format.'
            };
        }
    })
};

