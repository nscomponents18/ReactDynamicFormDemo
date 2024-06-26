import FileUploadComponent from "../../component/fileUploadComponent";
import { FooterConfig, FormConfigType, HeaderConfig, ValidationRule, ValidatorType, Validators } from "../../dynamicForm";

export interface IDataType {
    employee: string;
    role: string;
    gender: string;
    areyouworking: boolean;
    manager?: Record<string, string>[];
};

export const defaultValDataType: IDataType = {employee: '', role: "Employee", gender: "female", areyouworking: false};//, manager: [{name: 'Tom'}]
export const validateGender: ValidatorType<IDataType, string> = {
    type: "invalidGender",
    validate: (value: string, model: IDataType, key: keyof IDataType): ValidationRule => {
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

export const getDefaultHeader = () : HeaderConfig<IDataType> => {
    return {
        title: 'Form 1',
        leftSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                label: 'Save', 
                className: 'btn-secondary',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                label: 'Submit', 
                className: 'btn-primary',
                buttontype: 'submit'
            }
        ],
        rightSideControls: [
            {
                type: 'button',
                id: 'btnShare',
                name: 'btnShare',
                label: 'Share', 
                className: 'btn-sm btn-outline-secondary',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnExport',
                name: 'btnExport',
                label: 'Export', 
                className: 'btn-sm btn-outline-secondary',
                buttontype: 'button'
            }
        ]
    }
}

export const getDefaultFooter = () : FooterConfig<IDataType> => {
    return {
        /*leftSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                key: 'btnSave',
                label: 'Save', 
                className: 'btn-secondary',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                key: 'btnSubmit',
                label: 'Submit', 
                className: 'btn-primary',
                buttontype: 'submit'
            }
        ],*/
        /*centerControls: [
            {
                type: 'button',
                id: 'btnShare',
                name: 'btnShare',
                key: 'btnShare',
                label: 'Share', 
                className: 'btn-sm btn-outline-secondary',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnExport',
                name: 'btnExport',
                key: 'btnExport',
                label: 'Export', 
                className: 'btn-sm btn-outline-secondary',
                buttontype: 'button'
            }
        ],*/
        rightSideControls: [
            {
                type: 'button',
                id: 'btnSave',
                name: 'btnSave',
                label: 'Save', 
                className: 'btn-secondary',
                buttontype: 'button'
            },
            {
                type: 'button',
                id: 'btnSubmit',
                name: 'btnSubmit',
                label: 'Submit', 
                className: 'btn-primary',
                buttontype: 'submit'
            }
        ]
    }
}

export const getDefaultFormConfig = (isHorizontalForm: boolean): FormConfigType<IDataType> => {
    if(isHorizontalForm) {
        return {
            containerClass: 'container py-2 border border-1 con pt-1',
            isLabelControlsHorizontal: true,
            columns: [
                {
                    csscolmd: 12,
                    cssmb: 4,
                    csslabelcolsm: 4,
                    csscontrolcolsm: 8,
                    rows: [
                        {
                            csscolmd: 6,
                            csscolsm: 6,
                            key: "employee",
                            type: "select",
                            label: "Select Employee",
                            valueField: 'value',
                            className: 'form-select',
                            options: [],
                            required: true,
                            refRequired: true,
                            controlProps: {
                                'aria-label': "Select Employee"
                            },
                            
                        },
                        {
                            csscolmd: 6,
                            csscolsm: 6,
                            key: "role",
                            type: "text",
                            label: "Enter Role",
                            required: true,
                            validators: [Validators.required(), Validators.minLength(8)]
                        },
                    ],
                },
                {
                    csscolmd: 12,
                    cssmb: 4,
                    csslabelcolsm: 4,
                    csscontrolcolsm: 8,
                    rows: [
                        {
                            csscolmd: 6,
                            csscolsm: 6,
                            key: "gender",
                            type: "radio",
                            label: "Select Gender",
                            labelField: 'label',
                            valueField: 'value',
                            options: [
                                { key: 1, label: "Male", value: "male" },
                                { key: 2, label: "Female", value: "female" },
                            ],
                            validators:[validateGender],
                            hide: "employee === 'employee2'",
                        },
                        {
                            csscolsm: 6,
                            key: "areyouworking",
                            type: "toggleswitch",
                            id: "areyouworking",
                            label: "Are you working?",
                            disabled: false
                        },
                    ]
                },
                {
                    csscolmd: 12,
                    cssmb: 4,
                    csslabelcolsm: 4,
                    csscontrolcolsm: 8,
                    rows: [
                        {
                            csscolmd: 6,
                            csscolsm: 6,
                            key: "manager[0].name",
                            type: "text",
                            label: "Manager Name",
                            placeholder: "Enter Manager Name"
                        },
                        {
                            csscolsm: 6,
                            type: "label",
                            label: "Label 2",
                        },
                    ]
                },
                {
                    csscolmd: 12,
                    cssmb: 4,
                    csslabelcolsm: 4,
                    csscontrolcolsm: 4,
                    rows: [
                        {
                            csscolsm: 12,
                            csscontrolcolsm: 12,
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
                            validators:[validateGender]
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