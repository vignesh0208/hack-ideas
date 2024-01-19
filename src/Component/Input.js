import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  inputType,
  inputId,
  inputName,
  extraClassName,
  inputPlaceholder,
  inputValue,
  inputChecked,
  handleChange,
  isDisabled,
  inputRef,
  inputRequired,
}) => {
  return (
    <input
      type={inputType}
      id={inputId}
      name={inputName}
      className={`p-2 rounded text-sm text-[#262626] border-[1px] border-[#c5c9cd] bg-white focus-visible:outline-none ${
        inputType === 'number' &&
        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      } ${extraClassName}`}
      placeholder={inputPlaceholder}
      value={inputType !== 'checkbox' ? inputValue : undefined}
      checked={inputType === 'checkbox' ? inputChecked : undefined}
      onChange={handleChange}
      disabled={isDisabled}
      ref={inputRef}
      required={inputRequired}
    />
  );
};

Input.propTypes = {
  inputType: PropTypes.oneOf([
    'text',
    'password',
    'checkbox',
    'radio',
    'number',
  ]).isRequired,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  extraClassName: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.any,
  inputChecked: PropTypes.bool,
  handleChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  inputRef: PropTypes.any,
  inputRequired: PropTypes.bool,
};

Input.defaultProps = {
  inputType: 'text',
  inputId: '',
  inputName: '',
  extraClassName: '',
  inputPlaceholder: '',
  inputValue: '',
  inputChecked: false,
  handleChange: () => {},
  isDisabled: false,
  inputRef: null,
  inputRequired: false,
};

export default Input;
