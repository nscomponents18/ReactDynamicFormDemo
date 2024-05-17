import ToggleSwitch from "../../component/toggleSwitch/toggleSwitch";
import { ColClassesType, CustomControlCallback, ErrorType, FooterConfig, FormConfigType, FormControlType, HeaderConfig, Validators } from "../../dynamicForm";

export interface ICheckoutTailwind {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    zip: string;
    shippingAddressSameAsBilling: boolean;
    saveInformationNextTime: boolean;
    paymentMethod: string;
    "cc-name": string;
    "cc-number": string;
    "cc-expiration": string;
    "cc-cvv": string;
};

export const CheckoutDefaultValueTailwind: ICheckoutTailwind = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    shippingAddressSameAsBilling: false,
    saveInformationNextTime: false,
    paymentMethod: 'Credit card',
    "cc-name": '',
    "cc-number": '',
    "cc-expiration": '',
    "cc-cvv": ''
};

export const getCustomControlsTailwind: CustomControlCallback<ICheckoutTailwind> = (
  controlType: string,
  model: ICheckoutTailwind,
  index: number,
  errors: ErrorType,
  handleChange: (event: unknown, setting: FormControlType<ICheckoutTailwind>) => void,
  handleRef: (setting: FormControlType<ICheckoutTailwind>) => (node: any) => void,
  handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<ICheckoutTailwind>) => void,
  setting: FormControlType<ICheckoutTailwind>,
  parentSetting: ColClassesType | null,
): JSX.Element | null => {
  if(controlType === 'username') {
    return (
        <div className="flex items-center">
            <span className="bg-gray-200 text-gray-600 px-3 py-2 rounded-l-lg border border-r-0 border-gray-300">
                @
            </span>
            <input
                type="text"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-r-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={setting.placeholder}
                disabled={setting.disabled}
                value={model[setting.key as keyof ICheckoutTailwind] as string}
                onChange={e => handleChange(e, setting)}
                required={setting.required}
            />
        </div>
    )
  } else if(controlType === 'toggleswitch') {
    return <ToggleSwitch 
            disabled={setting.disabled}
            name={setting.name} id={setting.id} 
            checked={(model[setting.key as keyof ICheckoutTailwind] as boolean)} 
            onChange={(e: boolean) => handleChange(e, setting)}  />
  }
  return null;
};

export const getHeaderForCheckoutTailwind = () : HeaderConfig<ICheckoutTailwind> => {
    return {
        title: 'Billing Address',
        cssTitleCon: 'w-100'
    }
};

export const getFooterForCheckoutTailwind = () : FooterConfig<ICheckoutTailwind> => {
    return { 
      footerComp: (
        <button className="w-full bg-blue-500 text-white py-3 px-6 rounded leading-tight hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" type="submit">Continue to checkout</button>
      )
    };
};

export const getFormConfigForCheckoutTailwind = (): FormConfigType<ICheckoutTailwind> => {
    const textInputStyle = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500";
  return {
      containerClass: "container py-2 border border-solid con needs-validation",
      isLabelControlsHorizontal: false,
      columns: [
          {
            cssw: 'full',
            cssmb: 6,
            rows: [
                {
                    cssw: '1/2',
                    cssmr: 10,
                    key: "firstName",
                    type: "text",
                    label: "First name",
                    className: textInputStyle,
                    id: "firstName",
                    placeholder: "",
                    required: true,
                    validators: [Validators.required('Valid first name is required.')]
                },
                {
                    cssw: '5/12',
                    key: "lastName",
                    type: "text",
                    label: "Last name",
                    className: textInputStyle,
                    id: "lastName",
                    placeholder: "",
                    required: true,
                    validators: [Validators.required('Valid last name is required.')]
                },
            ]
          },
          {
            cssw: 'full',
            cssmb: 6,
            rows: [
                {
                    cssw: 'full',
                    key: "username",
                    type: "username",
                    label: "Username",
                    id: "username",
                    placeholder: "Username",
                    required: true,
                    validators: [Validators.required('Your username is required.')]
                },
            ]
          },
          {
            cssw: 'full',
            cssmb: 6,
              rows: [
                  {
                      cssw: 'full',
                      key: "email",
                      type: "email",
                      label: "Email(Optional)",
                      className: textInputStyle,
                      id: "email",
                      placeholder: "you@example.com",
                  },
              ]
          },
          {
            cssw: 'full',
            cssmb: 6,
              rows: [
                  {
                     cssw: 'full',
                      key: "address",
                      type: "text",
                      label: "Address",
                      id: "address",
                      className: textInputStyle,
                      placeholder: "1234 Main St",
                      required: true,
                      validators: [Validators.required('Please enter your shipping address.')]
                  },
              ]
          },
          {
            cssw: 'full',
            cssmb: 6,
              rows: [
                  {
                      cssw: 'full',
                      key: "address2",
                      type: "text",
                      label: "Address 2(Optional)",
                      id: "address2",
                      className: textInputStyle,
                      placeholder: "Apartment or suite",
                  },
              ]
          },
          {
              cssw: 'full',
              cssmb: 6,
              horizontalAllControlsClass: 'gap-4',
              rows: [
                  {
                      cssw: '1/4',
                      key: "country",
                      type: "select",
                      label: "Country",
                      id: "country",
                      className: textInputStyle,
                      required: true,
                      options: ["Choose...", "United States"],
                      validators: [Validators.required('Please select a valid country.')]
                  },
                  {
                      cssw: '1/4',
                      key: "state",
                      type: "select",
                      label: "State",
                      id: "state",
                      required: true,
                      className: 'form-select ' + textInputStyle,
                      options: ["Choose...", "California"],
                      validators: [Validators.required('Please provide a valid state.')]
                  },
                  {
                      cssw: '1/4',
                      key: "zip",
                      type: "text",
                      label: "Zip",
                      id: "zip",
                      className: textInputStyle,
                      required: true,
                      validators: [Validators.required('Zip code required.')]
                  }
              ]
          },
          {
            cssw: 'full',
            type: 'line',
            cssmb: 6,
          },
          {
            cssw: 'full',
            rows: [
                {
                    cssw: 'full',
                    key: "shippingAddressSameAsBilling",
                    type: 'checkbox',
                    id: 'shippingAddressSameAsBilling',
                    name: 'shippingAddressSameAsBilling',
                    label: 'Shipping address is the same as my billing address'
                }
            ]
          },
          {
            cssw: 'full',
            rows: [
                {
                cssw: 'full',
                    key: "saveInformationNextTime",
                    type: 'checkbox',
                    id: 'saveInformationNextTime',
                    name: 'saveInformationNextTime',
                    label: 'Save this information for next time'
                }
            ]
          },
          {
            cssw: 'full',
            type: 'line'
          },
          {
            cssw: 'full',
            type: 'header',
            label: 'Payment',
          },
          {
            cssw: 'full',
            cssmb: 3,
            rows: [
                {
                cssw: 'full',
                    key: "paymentMethod",
                    type: "radio",
                    options: [
                        {
                            key: "credit",
                            label: "Credit card",
                        },
                        {
                            key: "debit",
                            label: "Debit card",
                        },
                        {
                            key: "paypal",
                            label: "PayPal",
                        }
                    ]
                }
            ]
          },
          {
            cssw: 'full',
            cssmb: 6,
            rows: [
                {
                    cssw: '1/2',
                    cssmr: 10,
                    key: "cc-name",
                    type: "text",
                    label: "Name on card",
                    className: textInputStyle,
                    id: "cc-name",
                    placeholder: "",
                    required: true,
                    validators: [Validators.required('Name on card is required')],
                    additionalInfo: "Full name as displayed on card"
                },
                {
                    cssw: '5/12',
                    key: "cc-number",
                    type: "text",
                    className: textInputStyle,
                    label: "Credit card number",
                    id: "cc-number",
                    required: true,
                    validators: [Validators.required('Credit card number is required')]
                },
            ]
          },
          {
                cssw: 'full',
                rows: [
                    {
                        cssw: '1/4',
                        cssmr: 10,
                        className: textInputStyle,
                        key: "cc-expiration",
                        type: "text",
                        label: "Expiration",
                        id: "cc-expiration",
                        required: true,
                        validators: [Validators.required('Expiration date required')]
                    },
                    {
                        cssw: '1/4',
                        className: textInputStyle,
                        key: "cc-cvv",
                        type: "text",
                        label: "CVV",
                        id: "cc-cvv",
                        required: true,
                        validators: [Validators.required('Security code required')]
                    }
                ]
          },
          {
            cssw: 'full',
            type: 'line'
          },
      ],
  }    
};
