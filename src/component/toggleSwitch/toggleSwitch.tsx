import React from 'react';
import './toggleSwitch.css'; // Import CSS for styling

interface ToggleSwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
  optionLabels?: [string, string];
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  name,
  checked = false,
  onChange,
  optionLabels = ['Yes', 'No'],
  disabled = false,
}) => {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
      />
      <label className="toggle-switch-label" htmlFor={id}>
        <span className="toggle-switch-inner" data-yes={optionLabels[0]} data-no={optionLabels[1]} />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;