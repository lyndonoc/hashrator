import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/button';
import Loader from '../../components/loader';
import TagCloud from '../../components/tag-cloud';
import TagSlider from '../../components/tag-slider';
import { searchOperations } from '../../modules/search';

import './tag-explorer.scss';

const TagExplorer = ({
  currentIndex,
  selectedTags,
  tagsMap,
  onLoadMore,
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
          onLoadMore={onLoadMore}
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
  onLoadMore: PropTypes.func,
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
  onLoadMore: () => {},
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
    isLoading: PropTypes.bool,
    isMobile: PropTypes.bool,
    removeFromSelected: PropTypes.func.isRequired,
    results: PropTypes.object,
    searchForHashtag: PropTypes.func.isRequired,
    searchForMoreHashtags: PropTypes.func.isRequired,
    selectAHashtag: PropTypes.func.isRequired,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    currentIndex: 0,
    isLoading: false,
    isMobile: false,
    results: {},
    selectedTags: [],
  };

  handleTagClick(tag) {
    this.props.searchForHashtag(tag.replace('#', ''));
  }

  handleTagSelect(tag, isSelected) {
    this.props[
      isSelected
        ? 'removeFromSelected'
        : 'selectAHashtag'
    ](tag);
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
          onLoadMore={this.props.searchForMoreHashtags}
          onNavigate={this.props.changeSearchIndex}
          onTagClick={this.handleTagClick.bind(this)}
          onTagSelect={this.handleTagSelect.bind(this)}
          selectedTags={this.props.selectedTags}
          tagsMap={this.props.results}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentIndex: state.search.currentIndex,
  isLoading: state.search.isLoading,
  isMobile: state.layout.isMobile,
  results: state.search.results,
  selectedTags: state.search.selected,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...searchOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagExplorerContainer);
