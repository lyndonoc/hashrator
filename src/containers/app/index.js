import React, { Component } from 'react';

import SelectedTags from '../selected-tags';
import TagExplorerContainer from '../tag-explorer';
import TagSearcherContainer from '../tag-searcher';
import ToastsContainer from '../toasts';

import './app.scss';

class AppContainer extends Component {

  render() {
    return (
      <div className="app__container">
        <div className="app">
          <TagSearcherContainer/>
          <TagExplorerContainer/>
          <SelectedTags/>
          <ToastsContainer/>
        </div>
      </div>
    );
  }
}

export default AppContainer;
