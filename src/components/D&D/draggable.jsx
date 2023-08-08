/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useDraggable } from '@dnd-kit/core';

const Draggable = ({ children, id, element }) => {
  // const Element = element || 'div';
  const {
    attributes, listeners, setNodeRef, transform,
  } = useDraggable({
    id: `draggable-${id}}`,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default Draggable;

Draggable.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  element: PropTypes.elementType,
};

Draggable.defaultProps = {
  children: null,
  id: '',
  element: 'div',
};
