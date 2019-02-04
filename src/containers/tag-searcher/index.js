import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/button';
import { layoutOperations } from '../../modules/layout';
import { searchOperations } from '../../modules/search';

import './tag-searcher.scss';

const TagSearcher = ({
  isLoading,
  isSelectedOpen,
  onInputChange,
  onPageToggle,
  onSubmit,
  searchTerm,
  selectedLength,
}) => {
  const iconClassName = classnames('material-icons', {
    'material-icons--loading': isLoading
  });

  return (
    <div className="tag-searcher">
      <i className={iconClassName}>explore</i>
      {selectedLength > 0 && (
        <Button
          className="tag-searcher__togglebtn"
          icon={isSelectedOpen ? 'folder_open' : 'folder'}
          onClick={onPageToggle.bind(null, !isSelectedOpen)}
        >
          <span className="tag-searcher__togglebtn__text">
            {selectedLength}
          </span>
        </Button>
      )}
      <div className="tag-searcher__header">
        <h1 className="app__title">
          Search Hashtags
        </h1>
        <p className="tag-searcher__subtitle">
          See what hashtags are used<br/> together in Instagram:
        </p>
      </div>
      <form
        className="tag-searcher__form"
        onSubmit={onSubmit}
      >
        <input
          className="tag-searcher__form__input"
          disabled={isLoading}
          placeholder="#hashtag"
          type="text"
          value={searchTerm}
          onChange={onInputChange}
        />
        <Button
          className="tag-searcher__form__button"
          disabled={isLoading}
          text="Search"
          type="submit"
        />
      </form>
    </div>
  );
};

TagSearcher.propTypes = {
  isLoading: PropTypes.bool,
  isSelectedOpen: PropTypes.bool,
  onInputChange: PropTypes.func,
  onPageToggle: PropTypes.func,
  onSubmit: PropTypes.func,
  searchTerm: PropTypes.string,
  selectedLength: PropTypes.number,
};

TagSearcher.defaultProps = {
  isLoading: false,
  isSelectedOpen: false,
  onInputChange: () => {},
  onPageToggle: () => {},
  onSubmit: (event) => event.preventDefault(),
  searchTerm: '',
  selectedLength: 0,
};

class TagSearcherContainer extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    isSelectedOpen: PropTypes.bool,
    searchForHashtag: PropTypes.func.isRequired,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    toggleSelectedPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isLoading: false,
    isSelectedOpen: false,
    selectedTags: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: ''
    };
  }

  handleInputChange(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.searchTerm && !this.props.isLoading) {
      const term = this.state.searchTerm.trim();
      this.props.searchForHashtag(term);
      this.setState({
        searchTerm: ''
      });
    }
  }

  render() {
    return (
      <div className="tag-searcher__container">
        <TagSearcher
          isLoading={this.props.isLoading}
          isSelectedOpen={this.props.isSelectedOpen}
          onInputChange={this.handleInputChange.bind(this)}
          onPageToggle={this.props.toggleSelectedPage}
          onSubmit={this.handleFormSubmit.bind(this)}
          searchTerm={this.state.searchTerm}
          selectedLength={this.props.selectedTags.length}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.search.isLoading,
  isSelectedOpen: state.layout.isSelectedPageOpen,
  selectedTags: state.search.selected,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...layoutOperations,
  ...searchOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagSearcherContainer);
