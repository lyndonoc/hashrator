import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

import './tag-cloud.scss';

const TagCloud = ({
  hoverIndex,
  onClick,
  onMouseOver,
  onSelect,
  selectedTags,
  tags,
}) => {
  return (
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
            'tag-cloud__item--hovered': hoverIndex,
          });

          return (
            <span
              className={classname}
              key={tag}
              onMouseOver={onMouseOver && onMouseOver.bind(null, index)}
            >
              <i
                className="material-icons"
                onClick={onSelect && onSelect.bind(null, tag, isSelected)}
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
  );
};

TagCloud.propTypes = {
  hoverIndex: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onSelect: PropTypes.func,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagCloud.default = {
  hoverIndex: null,
  onClick: () => {},
  onMouseOver: () => {},
  onSelect: () => {},
  selectedTags: [],
  tags: [],
};

export default TagCloud;
