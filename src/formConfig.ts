import FileUploadComponent from "./component/fileUploadComponent";
import { FormConfigType } from "./dynamicForm/types";
import { Validators } from "./dynamicForm/validators";

export interface IDataType {
    employee: string;
    role: string;
    gender: string;
};

const validateGender = (value: string, model: IDataType, key: keyof IDataType) => {
    let valid: boolean = true;
    const employee: string = model['employee'];
    if(value === 'male' && employee === 'employee1') {
        valid = false;
    }
    else if(value === 'female' && employee !== 'employee1') {
        valid = false;
    }
    return {
        type: "invalidGender", 
        valid: valid,
        message: valid ? "" : "Gender value is not valid for selected Employee."
    };
};


export const getDefaultFormConfig = (): FormConfigType => {
    return {
        columns: [
            {
                colmd: 12,
                rows: [
                    {
                        colmd: 4,
                        colsm: 4,
                        key: "employee",
                        type: "Select",
                        label: "Select Employee",
                        options: [],
                        refRequired: true,
                    },
                    {
                        colmd: 4,
                        colsm: 4,
                        key: "role",
                        type: "input",
                        label: "Enter Role",
                        validators: [Validators.required, Validators.minLength(8)]
                    },
                    {
                        colmd: 4,
                        colsm: 4,
                        key: "gender",
                        type: "radio",
                        label: "Select Gender",
                        options: [
                            { key: 1, label: "Male", value: "male" },
                            { key: 2, label: "Female", value: "female" },
                        ],
                        validators:[validateGender]
                    },
                ],
            },
            {
                colmd: 12,
                rows: [
                    {
                        colmd: 12,
                        key: "upload",
                        type: "component",
                        refRequired: true,
                        component: FileUploadComponent
                    },
                ]
            }
        ],
    };
};