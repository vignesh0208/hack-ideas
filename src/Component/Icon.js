import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({
  handeClick,
  iconHeight,
  iconWidth,
  children,
  extraClassName,
}) => {
  return (
    <svg
      width={iconWidth}
      height={iconHeight}
      viewBox={`0 0 ${iconWidth} ${iconHeight}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={handeClick}
      className={extraClassName}>
      {children}
    </svg>
  );
};

Icon.propTypes = {
  handeClick: PropTypes.func,
  iconHeight: PropTypes.string,
  iconWidth: PropTypes.string,
  children: PropTypes.node.isRequired,
  extraClassName: PropTypes.string,
};

Icon.defaultProps = {
  handeClick: () => {},
  iconHeight: '20',
  iconWidth: '20',
  className: '',
  extraClassName: '',
};

export default Icon;
