import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './button.scss';

const Button = ({
  className,
  children,
  disabled,
  icon,
  onClick,
  text,
  type,
}) => {
  const _className = classnames('app-button', {
    [className]: className
  });

  return (
    <button
      className={_className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon && <i className="material-icons">{icon}</i>}
      {text && text}
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
};

Button.defaultProps = {
  className: '',
  children: null,
  disabled: false,
  onClick: () => {},
  icon: '',
  text: '',
  type: 'button',
};

export default Button;
