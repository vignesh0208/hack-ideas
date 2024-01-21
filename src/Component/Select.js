import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  selectId,
  selectName,
  selectOptions,
  selectedValue,
  handleSelect,
  extraClassName,
  optionClassName,
  selectDisabled,
}) => {
  return (
    <select
      id={selectId}
      name={selectName}
      value={selectedValue}
      onChange={handleSelect}
      className={extraClassName}
      disabled={selectDisabled}>
      {selectOptions.map((option) => (
        <option
          className={optionClassName}
          key={option}
          value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  selectId: PropTypes.string,
  selectName: PropTypes.string,
  selectOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  selectedValue: PropTypes.any,
  handleSelect: PropTypes.func,
  extraClassName: PropTypes.string,
  optionClassName: PropTypes.string,
  selectDisabled: PropTypes.bool,
};

Select.defaultProps = {
  selectOptions: ['One', 'Two', 'Three', 'Four'],
  selectedValue: 'One',
};

export default Select;
