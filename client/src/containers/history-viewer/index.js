import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../../components/button';
import SlideContainer from '../../components/slide-container';
import { historyOperations } from '../../modules/history';
import { layoutOperations } from '../../modules/layout';
import { searchOperations } from '../../modules/search';

import './history-viewer.scss';

const HistoryViewer = ({
  history,
  onClick,
  onRemove,
}) => {
  return (
    <div className="history-viewer">
      <h3 className="app__title history-viewer__title">
        Search History
      </h3>
      <div className="history-viewer__list">
        {Object.keys(history).map((date) => {
          return (
            <ul
              className="history-viewer__list__item"
              key={date}
            >
              <li className="history-viewer__list__title">{date}</li>
              {history[date].map((item) => {
                const {
                  tag,
                  timestamp
                } = item;

                return (
                  <li
                    className="history-viewer__list__history"
                    key={timestamp}
                  >
                    <div
                      className="history-viewer__list__history__text"
                      onClick={onClick.bind(null, item)}
                    >
                      <p>#{tag}</p>
                      <p>{moment.unix(timestamp / 1000).format('h:mm A')}</p>
                    </div>
                    <Button
                      className="history-viewer__list__history__btn"
                      icon="clear"
                      onClick={onRemove.bind(null, item)}
                    />
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

HistoryViewer.propTypes = {
  history: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string,
      timestamp: PropTypes.number,
    }))
  }),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
};

HistoryViewer.defaultProps = {
  history: [],
  onClick: () => {},
  onRemove: () => {},
};

class HistoryViewerContainer extends Component {

  static propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
      tag: PropTypes.string,
      timestamp: PropTypes.number,
    })),
    isMobile: PropTypes.bool,
    isOpen: PropTypes.bool,
    removeHistory: PropTypes.func.isRequired,
    searchForHashtags: PropTypes.func.isRequired,
    toggleHistoryPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    history: [],
    isMobile: false,
    isOpen: false,
  };

  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  handleOnClick(history) {
    this.props.toggleHistoryPage(false);
    this.props.searchForHashtags(history.tag);
  }

  handleOnRemove(history) {
    if (this.props.history.length === 1) {
      this.props.toggleHistoryPage(false);
    }
    this.props.removeHistory(history);
  }

  render() {
    const history = this.props.history
      .sort((a, b) => {
        return a.timestamp > b.timestamp ? -1 : 1;
      })
      .reduce((acc, curr) => {
        const date = moment
          .unix(Math.floor(curr.timestamp / 1000))
          .format('MMMM Do, YYYY');

        return {
          ...acc,
          [date]: (acc[date] || []).concat(curr),
        };
      }, {});
    const isOpen = this.props.isOpen && this.props.history.length > 0;

    return (
      <SlideContainer
        isMobile={this.props.isMobile}
        isOpen={isOpen}
      >
        <HistoryViewer
          history={history}
          onClick={this.handleOnClick}
          onRemove={this.handleOnRemove}
        />
      </SlideContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.history,
  isOpen: state.layout.isHistoryPageOpen,
  isMobile: state.layout.isMobile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...historyOperations,
  ...layoutOperations,
  ...searchOperations,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryViewerContainer);
