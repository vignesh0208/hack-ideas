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
  textareaValue,
  handleChange,
}) => {
  return (
    <textarea
      className={extraClassName}
      id={textareaId}
      name={textareaName}
      rows={textareaRow}
      cols={textareaCols}
      maxlength={textareaMaxLength}
      placeholder={textareaPlaceholder}
      readonly={textareaReadOnly}
      required={textareaRequired}
      disabled={textareaDisabled}
      handleChange={handleChange}>
      {textareaValue}
    </textarea>
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
  textareaValue: PropTypes.string,
  handleChange: PropTypes.func,
};

Textarea.defaultProps = {
  extraClassName: '',
  textareaRow: 4,
  textareaCols: 50,
  textareaPlaceholder: 'Enter value',
  textareaValue: '',
};

export default Textarea;
