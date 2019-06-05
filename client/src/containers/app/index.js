import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HistoryViewerContainer from '../history-viewer';
import SelectedTags from '../selected-tags';
import TagExplorerContainer from '../tag-explorer';
import TagSearcherContainer from '../tag-searcher';
import ToastsContainer from '../toasts';

import { selectionOperations } from '../../modules/selection';

import './app.scss';

class AppContainer extends Component {

  static propTypes = {
    toggleSelectingMultiple: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.enableSelectingMultiple.bind(this));
    document.addEventListener('keyup', this.disableSelectingMultiple.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enableSelectingMultiple.bind(this));
    document.removeEventListener('keyup', this.disableSelectingMultiple.bind(this));
  }

  enableSelectingMultiple(event) {
    if (event.which === 16) {
      this.props.toggleSelectingMultiple(true);
    }
  }

  disableSelectingMultiple(event) {
    if (event.which === 16) {
      this.props.toggleSelectingMultiple(false);
    }
  }

  render() {
    return (
      <div className="app__container">
        <div className="app">
          <TagSearcherContainer/>
          <TagExplorerContainer/>
          <HistoryViewerContainer/>
          <SelectedTags/>
          <ToastsContainer/>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...selectionOperations,
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(AppContainer);
