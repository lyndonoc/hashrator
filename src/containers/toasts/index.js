import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Toast from '../../components/toast';
import { toastsOperations } from '../../modules/toasts';

import './toasts.scss';

class ToastsContainer extends Component {

  static propTypes = {
    removeToast: PropTypes.func.isRequired,
    toasts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(['success', 'warning']),
      message: PropTypes.string,
    })),
  };

  static defaultProps = {
    toasts: [],
  };

  render() {
    const toasts = this.props.toasts;

    return (
      <TransitionGroup
        className="toasts__container"
        transitionName="toast"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={300}
      >
        {toasts.map((toast) => {
          return (
            <Toast
              key={toast.id}
              onClick={this.props.removeToast}
              toast={toast}
            />
          );
        })}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  toasts: state.toasts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...toastsOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToastsContainer);
