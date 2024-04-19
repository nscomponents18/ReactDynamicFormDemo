import React, { useState } from 'react';
import './toggleSwitch.css'; // Import CSS for styling

interface ToggleSwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
  optionLabels?: [string, string];
  disabled?: boolean;
}

const ToggleSwitch = React.forwardRef<HTMLInputElement, ToggleSwitchProps>(({
  id,
  name,
  checked = false,
  onChange,
  optionLabels = ['Yes', 'No'],
  disabled = false,
}, ref) => {
  const [activeOption, setActiveOption] = useState<boolean>(checked);
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => {
    return checkboxRef.current as HTMLInputElement
  });

  const handleSwitchClick = (val: boolean) => {
    setActiveOption(val);
    onChange?.(val);
    //if onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; is declared we can do like 
    //onChange?.({ target: { checked: val } } as React.ChangeEvent<HTMLInputElement>);
    triggerChange();
  };

  //not getting fired
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  const triggerChange = () => {
    if (checkboxRef.current) {
      const changeEvent = new Event('change', { bubbles: true });
      checkboxRef.current.dispatchEvent(changeEvent);
    }
  };

  return (
    <div className={`toggle-switch ${disabled ? "disabled" : ""}`}>
      <div className="toggle-switch-track">
        <div className={`toggle-switch-text-con ${activeOption ? "active-bg" : "inactive-bg"}`}
          onClick={() => handleSwitchClick(true)}>
          <div className="toggle-switch-text">{optionLabels[0]}</div>
        </div>
        <div className={`toggle-switch-text-con ${!activeOption ? "active-bg" : "inactive-bg"}`}
          onClick={() => handleSwitchClick(false)}>
          <div className="toggle-switch-text">{optionLabels[1]}</div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          ref={checkboxRef}
          id={id}
          name={name}
          checked={activeOption}
          onChange={handleToggle}
          disabled={disabled}
        />
      </div>
    </div>
  );
});

export default ToggleSwitch;