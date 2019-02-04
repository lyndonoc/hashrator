import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './tag-slider.scss';

const TagSlider = ({
  ButtonComponent,
  currentIndex,
  onLoadMore,
  onTagClick,
  onTagSelect,
  selectedTags,
  tagsMap,
  TagCloudComponent,
}) => {
  const tags = Object.keys(tagsMap);

  return (
    <div className="tag-slider__container">
      {tags.map((tag, index) => {
        const classname = classnames('tag-slider', {
          'tag-slider__left': currentIndex > index,
          'tag-slider__right': currentIndex < index
        });

        return (
          <div
            className={classname}
            key={index}
          >
            {tags[currentIndex] && (
              <h3 className="tag-slider__title">
                #{tags[currentIndex]}
              </h3>
            )}
            <TagCloudComponent
              key={index}
              onClick={onTagClick}
              onSelect={onTagSelect}
              selectedTags={selectedTags}
              tags={tagsMap[tag].results}
            />
            {!tagsMap[tag].isConsecutive && (
              <ButtonComponent
                className="tag-slider__morebtn"
                text="Load More"
                onClick={onLoadMore.bind(null, tags[currentIndex])}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

TagSlider.propTypes = {
  ButtonComponent: PropTypes.func,
  currentIndex: PropTypes.number,
  onLoadMore: PropTypes.func,
  onTagClick: PropTypes.func,
  onTagSelect: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  tagsMap: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.string),
  }),
  TagCloudComponent: PropTypes.func,
};

TagSlider.defaultProps = {
  ButtonComponent: () => {},
  currentIndex: 0,
  onLoadMore: () => {},
  onTagClick: () => {},
  onTagSelect: () => {},
  selectedTags: [],
  tagsMap: {},
  TagCloudComponent: () => {},
};

export default TagSlider;
