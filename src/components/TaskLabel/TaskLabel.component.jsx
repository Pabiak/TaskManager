import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LabelContainer from './TaskLabel.styles';

const TaskLabel = ({ priority }) => {
  const { t } = useTranslation();
  return (
    <LabelContainer priority={priority}>
      <span>{t(`taskLabel.${priority}`)}</span>
    </LabelContainer>
  );
};

export default TaskLabel;

TaskLabel.propTypes = {
  priority: PropTypes.oneOf([ 'high', 'medium', 'low', 'done' ]),
};

TaskLabel.defaultProps = {
  priority: 'low',
};
