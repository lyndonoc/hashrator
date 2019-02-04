import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './toast.scss';

const Toasts = ({
  onClick,
  toast,
}) => {
  const toastClassName = classnames('toast', {
    [`toast--${toast.type}`]: toast.type,
  });

  return (
    <div className={toastClassName}>
      <span>{toast.message}</span>
      <i
        className="material-icons"
        onClick={onClick.bind(null, toast.id)}
      >
        close
      </i>
    </div>
  );
};

Toasts.propTypes = {
  onClick: PropTypes.func,
  toast: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['success', 'warning']),
  }),
};

Toasts.defaultProps = {
  onClick: () => {},
  toast: {},
};

export default Toasts;
