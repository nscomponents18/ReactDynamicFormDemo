import ToggleSwitch from "../../component/toggleSwitch/toggleSwitch";
import { ColClassesType, CustomControlCallback, ErrorType, FooterConfig, FormConfigType, FormControlType, HeaderConfig, Validators } from "../../dynamicForm";

export interface ICheckout {
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

export const CheckoutDefaultValue: ICheckout = {
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

export const getCustomControls: CustomControlCallback<ICheckout> = (
  controlType: string,
  model: ICheckout,
  index: number,
  errors: ErrorType,
  handleChange: (event: unknown, setting: FormControlType<ICheckout>) => void,
  handleRef: (setting: FormControlType<ICheckout>) => (node: any) => void,
  handleClick: (event: React.MouseEvent<HTMLElement>, setting: FormControlType<ICheckout>) => void,
  setting: FormControlType<ICheckout>,
  parentSetting: ColClassesType | null,
): JSX.Element | null => {
  if(controlType === 'username') {
    return (
      <div className="input-group">
        <span className="input-group-text">@</span>
        <input className="form-control" type="text"
              placeholder={setting.placeholder} disabled={setting.disabled}
              value={model[setting.key as keyof ICheckout] as string}
              onChange={e => handleChange(e, setting)} required={setting.required} />
      </div>
    )
  } else if(controlType === 'toggleswitch') {
    return <ToggleSwitch 
            disabled={setting.disabled}
            name={setting.name} id={setting.id} 
            checked={(model[setting.key as keyof ICheckout] as boolean)} 
            onChange={(e: boolean) => handleChange(e, setting)}  />
  }
  return null;
};

export const getHeaderForCheckout = () : HeaderConfig<ICheckout> => {
    return {
        title: 'Billing Address',
        cssTitleCon: 'w-100'
    }
};

export const getFooterForCheckout = () : FooterConfig<ICheckout> => {
    return { 
      footerComp: (
        <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
      )
    };
};

export const getFormConfigForCheckout = (): FormConfigType<ICheckout> => {
  return {
      containerClass: "container py-2 border border-1 needs-validation",
      isLabelControlsHorizontal: false,
      columns: [
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscolsm: 6,
                      key: "firstName",
                      type: "text",
                      label: "First name",
                      id: "firstName",
                      placeholder: "",
                      required: true,
                      validators: [Validators.required('Valid first name is required.')]
                  },
                  {
                      csscolsm: 6,
                      key: "lastName",
                      type: "text",
                      label: "Last name",
                      id: "lastName",
                      placeholder: "",
                      required: true,
                      validators: [Validators.required('Valid last name is required.')]
                  },
              ]
          },
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscol: 12,
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
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscol: 12,
                      key: "email",
                      type: "email",
                      label: "Email(Optional)",
                      id: "email",
                      placeholder: "you@example.com",
                  },
              ]
          },
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscol: 12,
                      key: "address",
                      type: "text",
                      label: "Address",
                      id: "address",
                      placeholder: "1234 Main St",
                      required: true,
                      validators: [Validators.required('Please enter your shipping address.')]
                  },
              ]
          },
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscol: 12,
                      key: "address2",
                      type: "text",
                      label: "Address 2(Optional)",
                      id: "address2",
                      placeholder: "Apartment or suite",
                  },
              ]
          },
          {
              csscol: 12,
              rows: [
                  {
                      csscolmd: 5,
                      key: "country",
                      type: "select",
                      label: "Country",
                      id: "country",
                      required: true,
                      options: ["Choose...", "United States"],
                      validators: [Validators.required('Please select a valid country.')]
                  },
                  {
                      csscolmd: 4,
                      key: "state",
                      type: "select",
                      label: "State",
                      id: "state",
                      required: true,
                      className: 'form-select',
                      options: ["Choose...", "California"],
                      validators: [Validators.required('Please provide a valid state.')]
                  },
                  {
                      csscolmd: 3,
                      key: "zip",
                      type: "text",
                      label: "Zip",
                      id: "zip",
                      required: true,
                      validators: [Validators.required('Zip code required.')]
                  }
              ]
          },
          {
              csscol: 12,
              type: 'line'
          },
          {
              csscol: 12,
              rows: [
                  {
                      csscol: 12,
                      key: "shippingAddressSameAsBilling",
                      type: 'checkbox',
                      id: 'shippingAddressSameAsBilling',
                      name: 'shippingAddressSameAsBilling',
                      label: 'Shipping address is the same as my billing address'
                  }
              ]
          },
          {
              csscol: 12,
              rows: [
                  {
                      csscol: 12,
                      key: "saveInformationNextTime",
                      type: 'checkbox',
                      id: 'saveInformationNextTime',
                      name: 'saveInformationNextTime',
                      label: 'Save this information for next time'
                  }
              ]
          },
          {
              csscol: 12,
              type: 'line'
          },
          {
              csscol: 12,
              type: 'header',
              label: 'Payment',
          },
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscol: 12,
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
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscolmd: 6,
                      key: "cc-name",
                      type: "text",
                      label: "Name on card",
                      id: "cc-name",
                      placeholder: "",
                      required: true,
                      validators: [Validators.required('Name on card is required')],
                      additionalInfo: "Full name as displayed on card"
                  },
                  {
                      csscolmd: 6,
                      key: "cc-number",
                      type: "text",
                      label: "Credit card number",
                      id: "cc-number",
                      required: true,
                      validators: [Validators.required('Credit card number is required')]
                  },
              ]
          },
          {
              csscol: 12,
              cssmb: 3,
              rows: [
                  {
                      csscolmd: 3,
                      key: "cc-expiration",
                      type: "text",
                      label: "Expiration",
                      id: "cc-expiration",
                      required: true,
                      validators: [Validators.required('Expiration date required')]
                  },
                  {
                      csscolmd: 3,
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
              csscol: 12,
              type: 'line'
          },
      ],
  }    
};
