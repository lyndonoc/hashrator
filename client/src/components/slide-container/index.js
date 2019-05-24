import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './slide-container.scss';

const SlideContainer = ({
  children,
  isMobile,
  isOpen,
}) => {
  const baseClassName = 'slide-container';
  const containerClassName = classnames(baseClassName, {
    [`${baseClassName}--mobile`]: isMobile,
    [`${baseClassName}--visible`]: isOpen,
  });

  return (
    <div className={containerClassName}>
      {children}
    </div>
  );
};

SlideContainer.propTypes = {
  children: PropTypes.object,
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool,
};
SlideContainer.defaultProps = {
  children: null,
  isMobile: false,
  isOpen: false,
};

export default SlideContainer;
