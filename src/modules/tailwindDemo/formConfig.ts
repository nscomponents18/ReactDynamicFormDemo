import FileUploadComponent from "../../component/fileUploadComponent";
import { FooterConfig, FormConfigType, HeaderConfig, ValidationRule, ValidatorType, Validators } from "../../dynamicForm";
import {  } from "../../dynamicForm/utils/validators";

export interface IDataTypeTailwind {
    employee: string;
    role: string;
    gender: string;
    areyouworking: boolean;
};

export const defaultValDataType: IDataTypeTailwind = {employee: '', role: "Employee", gender: "female", areyouworking: false};
export const validateGenderTailwind: ValidatorType<IDataTypeTailwind, string> = {
    type: "invalidGender",
    validate: (value: string, model: IDataTypeTailwind, key: keyof IDataTypeTailwind): ValidationRule => {
        let valid = true;
        const employee: string = model['employee'];
        if (value === 'male' && employee === 'employee1') {
            valid = false;
        } else if (value === 'female' && employee !== 'employee1') {
            valid = false;
        }
        return {
            type: "invalidGender",
            valid: valid,
            message: valid ? "" : "Gender value is not valid for selected Employee."
        };
    },
};

export const getForm1HeaderTailwind = () : HeaderConfig<IDataTypeTailwind> => {
    return {
        title: 'Form 1',
        leftSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                key: 'btnSave',
                label: 'Save', 
                className: 'bg-gray-600 text-white px-4 py-2 border border-gray-600 rounded hover:bg-gray-700',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                key: 'btnSubmit',
                label: 'Submit', 
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded',
                buttontype: 'submit'
            }
        ],
        rightSideControls: [
            {
                type: 'button',
                id: 'btnShare',
                name: 'btnShare',
                key: 'btnShare',
                label: 'Share', 
                className: 'text-gray-600 border border-gray-600 px-3 py-1 rounded hover:bg-gray-600 hover:text-white focus:outline-none',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnExport',
                name: 'btnExport',
                key: 'btnExport',
                label: 'Export', 
                className: 'text-gray-600 border border-gray-600 px-3 py-1 rounded hover:bg-gray-600 hover:text-white focus:outline-none',
                buttontype: 'button'
            }
        ]
    }
}

export const getForm1FooterTailwind = () : FooterConfig<IDataTypeTailwind> => {
    return {
        leftSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                key: 'btnSave',
                label: 'Save', 
                className: 'bg-gray-600 text-white px-4 py-2 border border-gray-600 rounded hover:bg-gray-700',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                key: 'btnSubmit',
                label: 'Submit', 
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded',
                buttontype: 'submit'
            }
        ],
        centerControls: [
            {
                type: 'button',
                id: 'btnShare',
                name: 'btnShare',
                key: 'btnShare',
                label: 'Share', 
                className: 'text-gray-600 border border-gray-600 px-3 py-1 rounded hover:bg-gray-600 hover:text-white focus:outline-none',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnExport',
                name: 'btnExport',
                key: 'btnExport',
                label: 'Export', 
                className: 'text-gray-600 border border-gray-600 px-3 py-1 rounded hover:bg-gray-600 hover:text-white focus:outline-none',
                buttontype: 'button'
            }
        ],
        rightSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                key: 'btnSave',
                label: 'Save', 
                className: 'bg-gray-600 text-white px-4 py-2 border border-gray-600 rounded hover:bg-gray-700',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                key: 'btnSubmit',
                label: 'Submit', 
                className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded',
                buttontype: 'submit'
            }
        ]
    }
}

export const getForm1ConfigTailwind = (isHorizontalForm: boolean): FormConfigType<IDataTypeTailwind> => {
    if(isHorizontalForm) {
        return {
            containerClass: 'container py-2 border border-solid con mx-11',
            isLabelControlsHorizontal: true,
            columns: [
                {
                    cssw: 'full',
                    cssmb: 6,
                    csslabelw: '1/4',
                    csscontrolw: '1/2',
                    rows: [
                        {
                            cssw: '1/2',
                            key: "employee",
                            type: "select",
                            label: "Select Employee",
                            className: 'w-full form-select',
                            options: [],
                            required: true,
                            refRequired: true,
                            controlProps: {
                                'aria-label': "Select Employee"
                            }
                        },
                        {
                            cssw: '1/2',
                            key: "role",
                            type: "text",
                            label: "Enter Role",
                            required: true,
                            validators: [Validators.required(), Validators.minLength(8)]
                        },
                    ],
                },
                {
                    cssw: 'full',
                    cssmb: 6,
                    csslabelw: '1/4',
                    csscontrolw: '3/4',
                    //csscontrolspace: 'x-4',
                    rows: [
                        {
                            cssw: '1/2',
                            key: "gender",
                            type: "radio",
                            label: "Select Gender",
                            labelField: 'label',
                            valueField: 'value',
                            options: [
                                { key: 1, label: "Male", value: "male" },
                                { key: 2, label: "Female", value: "female" },
                            ],
                            validators:[validateGenderTailwind],
                            hide: "employee === 'employee2'",
                        },
                        {
                            cssw: '1/2',
                            key: "areyouworking",
                            type: "toggleswitch",
                            id: "areyouworking",
                            label: "Are you working?",
                            disabled: false
                        },
                    ]
                },
                {
                    cssw: 'full',
                    cssmb: 6,
                    rows: [
                        {
                            cssw: 'full',
                            key: "upload",
                            type: "component",
                            refRequired: true,
                            component: FileUploadComponent
                        },
                    ]
                }
            ],
        };
    }
    else {
        return {
            containerClass: 'con',
            columns: [
                {
                    csscolmd: 12,
                    rows: [
                        {
                            csscolmd: 4,
                            csscolsm: 4,
                            key: "employee",
                            type: "select",
                            label: "Select Employee",
                            className: 'form-select',
                            options: [],
                            required: true,
                            refRequired: true,
                            controlProps: {
                                'aria-label': "Select Employee"
                            }
                        },
                        {
                            csscolmd: 4,
                            csscolsm: 4,
                            key: "role",
                            type: "input",
                            required: true,
                            label: "Enter Role",
                            validators: [Validators.minLength(8)]
                        },
                        {
                            csscolmd: 4,
                            csscolsm: 4,
                            key: "gender",
                            type: "radio",
                            label: "Select Gender",
                            options: [
                                { key: 1, label: "Male", value: "male" },
                                { key: 2, label: "Female", value: "female" },
                            ],
                            validators:[validateGenderTailwind]
                        },
                    ],
                },
                {
                    csscolmd: 12,
                    rows: [
                        {
                            csscolsm: 4,
                            key: "areyouworking",
                            type: "toggleswitch",
                            id: "areyouworking",
                            label: "Are you working",
                            disabled: false
                        },
                    ]
                },
                {
                    csscolmd: 12,
                    type: 'line'
                },
                {
                    csscolmd: 12,
                    rows: [
                        {
                            csscolmd: 12,
                            key: "upload",
                            type: "component",
                            refRequired: true,
                            component: FileUploadComponent
                        },
                    ]
                }
            ],
        };
    }
    
};