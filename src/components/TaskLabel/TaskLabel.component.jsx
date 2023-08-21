import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LabelContainer from './taskLabel.styles';

const TaskLabel = ({ priority, onLabelClick }) => {
  const { t } = useTranslation();
  return (
    <LabelContainer priority={priority} onClick={onLabelClick}>
      <span>{t(`taskLabel.${priority}`)}</span>
    </LabelContainer>
  );
};

export default TaskLabel;

TaskLabel.propTypes = {
  priority: PropTypes.oneOf([ 'high', 'medium', 'low', 'done' ]),
  onLabelClick: PropTypes.func,
};

TaskLabel.defaultProps = {
  priority: 'low',
  onLabelClick: () => {},
};
