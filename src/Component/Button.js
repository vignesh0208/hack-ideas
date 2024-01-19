import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  buttonType,
  handleClick,
  extraClassName,
  isDisabled,
  children,
}) => {
  return (
    <button
      type={buttonType}
      onClick={handleClick}
      className={`cursor-pointe ${extraClassName}`}
      disabled={isDisabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(['button', 'submit']).isRequired,
  extraClassName: PropTypes.string,
  isDisabled: PropTypes.bool,
  children: PropTypes.any,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  buttonType: 'button',
  extraClassName: '',
  isDisabled: false,
  children: '',
  handleClick: () => {},
};

export default Button;
