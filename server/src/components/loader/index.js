import PropTypes from 'prop-types';
import React from 'react';

import './loader.scss';

const Loader = ({
  isLoading,
  style,
}) => {
  return isLoading && (
    <div
      className="loader"
      style={style}
    >
      <span className="loader__item"/>
      <span className="loader__item"/>
      <span className="loader__item"/>
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  style: PropTypes.object,
};

Loader.defaultProps = {
  isLoading: false,
  style: {}
};

export default Loader;
