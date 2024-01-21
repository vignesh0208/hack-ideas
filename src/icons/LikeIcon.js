import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../Component';

function Path({ fillColor }) {
  return (
    <path
      d='M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z'
      fill={fillColor}
    />
  );
}

export default function LikeIcon(props) {
  const { fillColor, handeClick, iconHeight, iconWidth } = props;

  return (
    <Icon
      onClick={handeClick}
      iconHeight={iconHeight}
      iconWidth={iconWidth}
      children={<Path fillColor={fillColor} />}
    />
  );
}

LikeIcon.propTypes = {
  fillColor: PropTypes.string,
  handeClick: PropTypes.func,
};

LikeIcon.defaultProps = {
  fillColor: '#131313',
  onClick: () => {},
};
