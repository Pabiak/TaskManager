import React from 'react';
import PropTypes from 'prop-types';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ children, listID }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${listID}`,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
};

export default Droppable;

Droppable.propTypes = {
  children: PropTypes.node,
  listID: PropTypes.string,
};

Droppable.defaultProps = {
  children: null,
  listID: '',
};
