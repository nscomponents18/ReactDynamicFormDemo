import React from "react";

import ToggleSwitch from '../../component/toggleSwitch/toggleSwitch';
import DynamicForm from "../../dynamicForm/dynamicForm";
import { ColClassesType, ColumnType, CustomControlCallback, ErrorType, FooterConfig, FormConfigType, FormControlType, HeaderConfig } from '../../dynamicForm/types';
import { IDataType, defaultValDataType, getDefaultFooter, getDefaultFormConfig, getDefaultHeader } from './formConfig';
import { CheckoutDefaultValue, ICheckout, getCustomControls, getFooterForCheckout, getFormConfigForCheckout, getHeaderForCheckout } from './formConfigCheckout';

//import 'bootstrap/dist/css/bootstrap.css';
import { addLink, deleteScriptTagById, deleteStyleById, deleteStyleTagContainingText } from "../../AppUtils";


const BootstrapDemo: React.FC = () => {
    const employeeRef = React.useRef<HTMLSelectElement | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);


    const [state, setState] = React.useState<IDataType>(defaultValDataType);
    const [headerConfig, setHeaderConfig] = React.useState<HeaderConfig>({ ...getDefaultHeader() });
    const [formConfig, setFormConfig] = React.useState<FormConfigType>({ ...getDefaultFormConfig(true) });
    const [footerConfig, setFooterConfig] = React.useState<FooterConfig>({ ...getDefaultFooter() });

    const [bodyCheckout, setBodyCheckout] = React.useState<FormConfigType>({ ...getFormConfigForCheckout() });
    const [stateCheckout, setStateCheckout] = React.useState<ICheckout>(CheckoutDefaultValue);

    /*React.useEffect(() => {
        // Dynamically import Bootstrap CSS
        const cssUrl = require('bootstrap/dist/css/bootstrap.css');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssUrl.default;
        document.head.appendChild(link);
    
        return () => {
          // Remove the stylesheet when the component unmounts
          document.head.removeChild(link);
        };
    }, []);*/

    /*React.useEffect(() => {
        deleteStyleTagContainingText('tailwindcss');
    }, []);*/

    React.useEffect(() => {
        /*deleteScriptTagById('tailwind');
        deleteScriptTagById('tailwind-config');
        deleteStyleById('tailwind-style');
        deleteStyleTagContainingText('tailwindcss');*/
        addLink('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css', 'bootstrap');
        /*setTimeout(() => {
            deleteStyleTagContainingText('tailwindcss');
        },2000);*/
    }, []);


    React.useEffect(() => {
        const employeeOptions = [
        { key: 1, label: "Employee 1", value: "employee1" },
        { key: 2, label: "Employee 2", value: "employee2" },
        { key: 3, label: "Employee 3", value: "employee3" },
        ];
        const formConfigClone = {...formConfig};
        formConfigClone.columns[0].rows![0].options = employeeOptions;
        setFormConfig(formConfigClone);
        const stateClone = { ...state, employee: employeeOptions[1].value };
        setState(stateClone);
    }, []);

    React.useEffect(() => {
        if(employeeRef.current) {
        console.log("Employee Select Ref Initalized");
        }
    }, [employeeRef.current]);

    React.useEffect(() => {
        if(fileInputRef.current) {
        console.log("HTMLInputElement of type File of Upload Multiple Files inside FileUploadComponent Component Initalized using Forward Ref");
        }
    }, [fileInputRef.current]);

    const handleChange = (event: any,key: string, value: any, model: IDataType) => {
        console.log(`Change happened for key ${key} with value ${value}`);
        const formConfigClone = {...formConfig};
        if(key === 'employee') {
            let gender: FormControlType<IDataType> | undefined;
            let colIndex: number;
            let rowIndex: number;
            formConfigClone.columns.map((column: ColumnType) => {
                if(!gender) {
                    gender = column.rows?.filter(item => item.key === 'gender')[0];
                }
            });
            if(gender) {
                //gender.hide = false;
                if(value === 'employee1') {
                    //setState({...model, gender: 'female'});
                    model.gender = 'female';
                }
                else if(value === 'employee2') {
                    //gender.hide = true;
                }
                else {
                    //setState({...model, gender: 'male'});
                    model.gender = 'male';
                }
            }
            model.role = value as string;
        }
        setFormConfig(formConfigClone);
    };

    const setRefs = (ref: any, key: string) => {
        if(key === 'employee' && !employeeRef.current) {
        employeeRef.current = (ref as HTMLSelectElement);
        }
        if(key === 'upload' && !fileInputRef.current) {
        fileInputRef.current = (ref as HTMLInputElement);
        }
    };

    const getControl: CustomControlCallback<IDataType> = (
        controlType: string,
        model: IDataType,
        index: number,
        errors: ErrorType,
        handleChange: (event: unknown, setting: FormControlType<IDataType>) => void,
        handleRef: (setting: FormControlType<IDataType>) => (node: any) => void,
        handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<IDataType>) => void,
        setting: FormControlType<IDataType>,
        parentSetting: ColClassesType | null,
    ): JSX.Element | null => {
        if(controlType === 'toggleswitch') {
        return <ToggleSwitch 
                disabled={setting.disabled}
                name={setting.name} id={setting.id} 
                checked={(model[setting.key] as boolean)} 
                onChange={(e: boolean) => handleChange(e, setting)}  />
        }
        return null;
    };

    const handleCheckoutChange = (event: any,key: string, value: any, model: ICheckout) => {
    };
    
    return (
        <>
            <div style={{marginBottom: "10px"}}>
                <DynamicForm header={headerConfig} body={formConfig} footer={footerConfig} model={state} setModel={setState} onChange={handleChange} 
                    setRef={setRefs} getCustomControls={getControl} />
            </div>
            <div className='container px-0'>
                <div className='row g-5'>
                    <div className="col-md-7 col-lg-8">
                        <DynamicForm header={getHeaderForCheckout()} body={bodyCheckout} footer={getFooterForCheckout()} model={stateCheckout} 
                        setModel={setStateCheckout} onChange={handleCheckoutChange} setRef={setRefs} validateOnSubmit={true}
                        getCustomControls={getCustomControls}/>
                    </div>
                </div>
            </div>
        </>
    );
};
  
export default BootstrapDemo;