import React from 'react';
import PropTypes from 'prop-types';

import { SpinnerContainer, LoadingSpinner } from './spinner.styles';

const Spinner = ({ small }) => (
  <SpinnerContainer small={small}>
    <LoadingSpinner small={small} />
  </SpinnerContainer>
);

export default Spinner;

Spinner.propTypes = {
  small: PropTypes.bool,
};

Spinner.defaultProps = {
  small: false,
};
