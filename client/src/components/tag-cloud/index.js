import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import { Scrollbars } from 'react-custom-scrollbars';

import './tag-cloud.scss';

const TagCloud = ({
  hoverIndex,
  lastSelectedIndex,
  onClick,
  onMouseOver,
  onSelect,
  selectedTags,
  tags,
}) => {
  const handleClick = (tag, isSelected, itemIndex) => {
    onSelect(
      !isSelected
        ? hoverIndex
          ? tags.slice(
            Math.min(itemIndex, lastSelectedIndex),
            Math.max(itemIndex, lastSelectedIndex) + 1
          )
          : [tag]
        : tag,
      isSelected,
      itemIndex
    );
  };

  const shouldBeHovered = (itemIndex) => {
    if (hoverIndex < lastSelectedIndex) {
      return itemIndex < lastSelectedIndex && itemIndex >= hoverIndex;
    }
    return itemIndex > lastSelectedIndex && itemIndex <= hoverIndex;
  };

  return (
    <Scrollbars autoHideTimeout={1000}>
      <div className="tag-cloud__container">
        <TransitionGroup
          className="tag-cloud"
          transitionName="tag-cloud__item"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {tags.map((tag, index) => {
            const isSelected = selectedTags.includes(tag);
            const classname = classnames('tag-cloud__item', {
              'tag-cloud__item--selected': isSelected,
              'tag-cloud__item--hovered': hoverIndex && shouldBeHovered(index),
            });

            return (
              <span
                className={classname}
                key={tag + index}
                onMouseOver={onMouseOver && onMouseOver.bind(null, index)}
              >
                <i
                  className="material-icons"
                  onClick={handleClick.bind(null, tag, isSelected, index)}
                  // onClick={onSelect && onSelect.bind(null, tag, isSelected, index)}
                >
                  {isSelected ? 'check_circle' : 'fiber_manual_record'}
                </i>
                <span
                  className="tag-cloud__item__text"
                  onClick={onClick && onClick.bind(null, tag, isSelected)}
                >
                  {tag}
                </span>
              </span>
            );
          })}
        </TransitionGroup>
      </div>
    </Scrollbars>
  );
};

TagCloud.propTypes = {
  hoverIndex: PropTypes.number,
  lastSelectedIndex: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onSelect: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagCloud.default = {
  hoverIndex: null,
  lastSelectedIndex: null,
  onClick: () => {},
  onMouseOver: () => {},
  onSelect: () => {},
  selectedTags: [],
  tags: [],
};

export default TagCloud;
