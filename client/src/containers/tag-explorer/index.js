import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/button';
import Loader from '../../components/loader';
import TagCloud from '../../components/tag-cloud';
import TagSlider from '../../components/tag-slider';
import { layoutOperations } from '../../modules/layout';
import { searchOperations } from '../../modules/search';

import './tag-explorer.scss';

const TagExplorer = ({
  currentIndex,
  hoverIndex,
  selectedTags,
  tagsMap,
  onLoadMore,
  onMouseOver,
  onNavigate,
  onTagClick,
  onTagSelect,
}) => {
  const terms = Object.keys(tagsMap);
  const prevIndex = Math.max(0, currentIndex - 1);
  const prevItem = terms[currentIndex - 1];
  const nextIndex = Math.min(terms.length - 1, currentIndex + 1);
  const nextItem = terms[currentIndex + 1];

  return (
    <div className="tag-explorer">
      <div
        className={classnames('tag-explorer__navigator', {
          'tag-explorer__navigator--hidden': !prevItem
        })}
        onClick={onNavigate.bind(null, prevIndex)}
      >
        <i className="material-icons">keyboard_arrow_left</i>
      </div>
      <div className="tag-explorer__tagcloud">
        <TagSlider
          ButtonComponent={Button}
          currentIndex={currentIndex}
          hoverIndex={hoverIndex}
          onLoadMore={onLoadMore}
          onMouseOver={onMouseOver}
          onTagClick={onTagClick}
          onTagSelect={onTagSelect}
          selectedTags={selectedTags}
          tagsMap={tagsMap}
          TagCloudComponent={TagCloud}
        />
      </div>
      <div
        className={classnames('tag-explorer__navigator', {
          'tag-explorer__navigator--hidden': !nextItem
        })}
        onClick={onNavigate.bind(null, nextIndex)}
      >
        <i className="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
  );
};

TagExplorer.propTypes = {
  currentIndex: PropTypes.number,
  hoverIndex: PropTypes.number,
  onLoadMore: PropTypes.func,
  onMouseOver: PropTypes.func,
  onNavigate: PropTypes.func,
  onTagClick: PropTypes.func,
  onTagSelect: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  tagsMap: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.string),
  }),
};

TagExplorer.defaultProps = {
  currentIndex: 0,
  hoverIndex: null,
  onLoadMore: () => {},
  onMouseOver: () => {},
  onNavigate: () => {},
  onTagClick: () => {},
  onTagSelect: () => {},
  selectedTags: [],
  tagsMap: {},
};

class TagExplorerContainer extends Component {

  static propTypes = {
    changeSearchIndex: PropTypes.func.isRequired,
    currentIndex: PropTypes.number,
    hoverIndex: PropTypes.number,
    isLoading: PropTypes.bool,
    isMobile: PropTypes.bool,
    isSelectingMultiple: PropTypes.bool,
    removeFromSelected: PropTypes.func.isRequired,
    results: PropTypes.object,
    searchForHashtags: PropTypes.func.isRequired,
    selectAHashtag: PropTypes.func.isRequired,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    updateHoverIndex: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentIndex: 0,
    hoverIndex: null,
    isLoading: false,
    isMobile: false,
    isSelectingMultiple: false,
    results: {},
    selectedTags: [],
  };

  constructor(props) {
    super(props);

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.updateHoverIndex = this.updateHoverIndex.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      isSelectingMultiple,
      selectedTags,
    } = props;

    return {
      ...state,
      isSelectingMultiple: selectedTags.length > 0 && isSelectingMultiple,
    };
  }

  handleLoadMore(tag) {
    this.props.searchForHashtags(tag, {
      type: 'more'
    });
  }

  handleTagClick(tag) {
    this.props.searchForHashtags(tag.replace('#', ''));
  }

  handleTagSelect(tag, isSelected) {
    this.props[
      isSelected
        ? 'removeFromSelected'
        : 'selectAHashtag'
    ](tag);
  }

  updateHoverIndex(index) {
    if (this.state.isSelectingMultiple) {
      this.props.updateHoverIndex(index);
    }
  }

  render() {
    const containerClassName = classnames('tag-explorer__container', {
      'tag-explorer__container--mobile': this.props.isMobile,
    });

    return (
      <div className={containerClassName}>
        <Loader isLoading={this.props.isLoading}/>
        <TagExplorer
          currentIndex={this.props.currentIndex}
          isSelectingMultiple={this.state.isSelectingMultiple}
          hoverIndex={this.props.hoverIndex}
          onLoadMore={this.handleLoadMore}
          onMouseOver={this.updateHoverIndex}
          onNavigate={this.props.changeSearchIndex}
          onTagClick={this.handleTagClick}
          onTagSelect={this.handleTagSelect}
          selectedTags={this.props.selectedTags}
          tagsMap={this.props.results}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.search.currentIndex,
  hoverIndex: state.layout.hoverIndex,
  isLoading: state.search.isLoading,
  isMobile: state.layout.isMobile,
  isSelectingMultiple: state.layout.isSelectingMultiple,
  results: state.search.results,
  selectedTags: state.search.selected,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...layoutOperations,
  ...searchOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagExplorerContainer);
