import React from "react";
//import './tailwind.css';
import { addScript, addStyle, deleteLinkTagById, deleteScriptTagById, deleteStyleById, deleteStyleTagContainingText } from "../../AppUtils";
import ToggleSwitch from "../../component/toggleSwitch/toggleSwitch";
import DynamicForm from "../../dynamicForm/dynamicForm";
import { ColClassesType, ColumnType, CustomControlCallback, ErrorType, FooterConfig, FormConfigType, FormControlType, HeaderConfig } from "../../dynamicForm/types";
import { IDataTypeTailwind, defaultValDataType, getForm1ConfigTailwind, getForm1FooterTailwind, getForm1HeaderTailwind } from "./formConfig";
import { CheckoutDefaultValueTailwind, ICheckoutTailwind, getCustomControlsTailwind, getFooterForCheckoutTailwind, getFormConfigForCheckoutTailwind, getHeaderForCheckoutTailwind } from "./formConfigCheckoutTailwind";

const TailwindDemo: React.FC = () => {

    const employeeRef = React.useRef<HTMLSelectElement | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const [render, setRender] = React.useState<boolean>(false);
    const [state, setState] = React.useState<IDataTypeTailwind>({...defaultValDataType});
    const [headerConfig, setHeaderConfig] = React.useState<HeaderConfig>({ ...getForm1HeaderTailwind() });
    const [formConfig, setFormConfig] = React.useState<FormConfigType>({ ...getForm1ConfigTailwind(true) });
    const [footerConfig, setFooterConfig] = React.useState<FooterConfig>({ ...getForm1FooterTailwind() });

    const [bodyCheckout, setBodyCheckout] = React.useState<FormConfigType>({ ...getFormConfigForCheckoutTailwind() });
    const [stateCheckout, setStateCheckout] = React.useState<ICheckoutTailwind>(CheckoutDefaultValueTailwind);

    //const [bodyCheckout, setBodyCheckout] = React.useState<FormConfigType>({ ...getFormConfigForCheckout() });
    //const [stateCheckout, setStateCheckout] = React.useState<ICheckout>(CheckoutDefaultValue);
    /*React.useEffect(() => {
        // Dynamically import CSS and create a stylesheet link
        import('./tailwind.css')
          .then(cssModule => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            // Assuming the path is correctly exposed as default export
            link.href = cssModule.default;
            document.head.appendChild(link);
    
            return () => {
              // Clean up the link tag when the component unmounts
              document.head.removeChild(link);
            };
          });
      }, []);*/

    /*React.useEffect(() => {
        deleteStyleTagContainingText('Bootstrap');
    }, []);*/

    /*React.useEffect(() => {
        deleteLinkTagById('bootstrap');
        const script: string = `tailwind.config = {
            theme: {
              extend: {
                width: {
                '33/100': '33%', // Adding custom width utility
                }
            }
          }
        }
        `;
        const styles = `.card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, .125);
            border-radius: .25rem;
        }
        .card-header {
            padding: .5rem 1rem;
            margin-bottom: 0;
            background-color: rgba(0, 0, 0, .03);
            border-bottom: 1px solid rgba(0, 0, 0, .125);
        }
        .card-header:first-child {
            border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
        }
        .card-body {
            flex: 1 1 auto;
            padding: 1rem 1rem;
        }`;
        addScript('https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries', null, 'tailwind',() => {
            setRender(true);
            addScript(null, script, 'tailwind-config');
            addStyle(styles,'tailwind-style');
        });
        return () => {
            deleteScriptTagById('tailwind');
            deleteScriptTagById('tailwind-config');
            deleteStyleById('tailwind-style');
            deleteStyleTagContainingText('tailwindcss');
        }
    }, []);*/

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

    const handleChange = (event: any,key: string, value: any, model: IDataTypeTailwind) => {
        console.log(`Change happened for key ${key} with value ${value}`);
        const formConfigClone = {...formConfig};
        if(key === 'employee') {
        let gender: FormControlType<IDataTypeTailwind> | undefined;
        formConfigClone.columns.map((column: ColumnType) => {
            if(!gender) {
            gender = column.rows?.filter(item => item.key === 'gender')[0];
            }
        });
        if(gender) {
            gender.hide = false;
            if(value === 'employee1') {
            //setState({...model, gender: 'female'});
            model.gender = 'female';
            }
            else if(value === 'employee2') {
            gender.hide = true;
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

    const getControl: CustomControlCallback<IDataTypeTailwind> = (
        controlType: string,
        model: IDataTypeTailwind,
        index: number,
        errors: ErrorType,
        handleChange: (event: unknown, setting: FormControlType<IDataTypeTailwind>) => void,
        handleRef: (setting: FormControlType<IDataTypeTailwind>) => (node: any) => void,
        handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<IDataTypeTailwind>) => void,
        setting: FormControlType<IDataTypeTailwind>,
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

    const handleCheckoutChange = (event: any,key: string, value: any, model: ICheckoutTailwind) => {
    };
    
    return (
        <>
            <div style={{marginBottom: "10px"}}>
                <DynamicForm cssFramework='tailwind' header={headerConfig} body={formConfig} footer={footerConfig} model={state} setModel={setState} onChange={handleChange} 
                        setRef={setRefs} getCustomControls={getControl} />
            </div>
            <div className='container px-0 mx-11'>
                <div className='w-3/4'>
                    <div className="w-full p-6">
                        <DynamicForm cssFramework='tailwind' header={getHeaderForCheckoutTailwind()} body={bodyCheckout} footer={getFooterForCheckoutTailwind()} model={stateCheckout} 
                        setModel={setStateCheckout} onChange={handleCheckoutChange} setRef={setRefs} validateOnSubmit={true}
                        getCustomControls={getCustomControlsTailwind}/>
                    </div>
                </div>
            </div>
        </>
          
        
    )
};

export default TailwindDemo;