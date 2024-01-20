import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({
  extraClassName,
  textareaId,
  textareaName,
  textareaRow,
  textareaCols,
  textareaMaxLength,
  textareaPlaceholder,
  textareaReadOnly,
  textareaRequired,
  textareaDisabled,
  children,
  handleChange,
}) => {
  return (
    <textarea
      className={`resize-none focus-visible:outline-none ${extraClassName}`}
      id={textareaId}
      name={textareaName}
      rows={textareaRow}
      cols={textareaCols}
      maxLength={textareaMaxLength}
      placeholder={textareaPlaceholder}
      readOnly={textareaReadOnly}
      required={textareaRequired}
      disabled={textareaDisabled}
      value={children}
      onChange={handleChange}></textarea>
  );
};

Textarea.propTypes = {
  extraClassName: PropTypes.string,
  textareaId: PropTypes.string,
  textareaName: PropTypes.string,
  textareaRow: PropTypes.number,
  textareaCols: PropTypes.number,
  textareaMaxLength: PropTypes.number,
  textareaPlaceholder: PropTypes.string,
  textareaReadOnly: PropTypes.bool,
  textareaRequired: PropTypes.bool,
  textareaDisabled: PropTypes.bool,
  children: PropTypes.string,
  handleChange: PropTypes.func,
};

Textarea.defaultProps = {
  extraClassName: '',
  textareaRow: 4,
  textareaCols: 50,
  textareaPlaceholder: 'Enter value',
  children: '',
};

export default Textarea;
