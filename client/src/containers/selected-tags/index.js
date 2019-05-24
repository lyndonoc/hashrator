import copy from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/button';
import SlideContainer from '../../components/slide-container';
import TagCloud from '../../components/tag-cloud';
import { searchOperations } from '../../modules/search';
import { toastsOperations } from '../../modules/toasts';

import './selected-tags.scss';

const SelectedTags = ({
  hasBeenCopied,
  onCopy,
  onTagRemove,
  selectedTags,
}) => {
  return (
    <div className="selected-tags">
      <h3 className="app__title selected-tags__title">
        Selected Tags
      </h3>
      <TagCloud
        onSelect={onTagRemove}
        selectedTags={selectedTags}
        tags={selectedTags}
      />
      <Button
        className="selected-tags__btn"
        disabled={hasBeenCopied}
        onClick={onCopy.bind(null, selectedTags.join(' '))}
        text="Copy to clipboard"
      />
    </div>
  );
};

SelectedTags.propTypes = {
  hasBeenCopied: PropTypes.bool,
  isOpen: PropTypes.bool,
  onCopy: PropTypes.func,
  onTagRemove: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
};

SelectedTags.defaultProps = {
  hasBeenCopied: false,
  isOpen: false,
  onCopy: () => {},
  onTagRemove: () => {},
  selectedTags: [],
};

class SelectedTagsContainer extends Component {

  static propTypes = {
    addNewToast: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    removeFromSelected: PropTypes.func.isRequired,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    isMobile: false,
    isOpen: false,
    selectedTags: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      hasBeenCopied: false,
    };
  }

  onCopyToClipboard(tags) {
    copy(tags);

    this.setState({
      hasBeenCopied: true
    }, () => {
      this.props.addNewToast('Copied to clipboard!');
      setTimeout(() => {
        this.setState({
          hasBeenCopied: false
        });
      }, 1000);
    });
  }

  render() {
    return (
      <SlideContainer
        isMobile={this.props.isMobile}
        isOpen={this.props.isOpen && this.props.selectedTags.length > 0}
      >
        <SelectedTags
          hasBeenCopied={this.state.hasBeenCopied}
          onCopy={this.onCopyToClipboard.bind(this)}
          onTagRemove={this.props.removeFromSelected}
          selectedTags={this.props.selectedTags}
        />
      </SlideContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.layout.isSelectedPageOpen,
  isMobile: state.layout.isMobile,
  selectedTags: state.search.selected,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...searchOperations,
  ...toastsOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedTagsContainer);
