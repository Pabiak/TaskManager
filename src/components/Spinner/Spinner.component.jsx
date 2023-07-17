import React from 'react';

import { SpinnerContainer, LoadingSpinner } from './Spinner.styles';

const Spinner = ({ small }) => (
  <SpinnerContainer small={small}>
    <LoadingSpinner small={small} />
  </SpinnerContainer>
);

export default Spinner;
