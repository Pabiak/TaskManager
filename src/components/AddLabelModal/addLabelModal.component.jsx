import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { ButtonContainer, StyledButton, StyledModalBody } from './addLabelModal.styles';

const AddLabelModal = ({
  open, toggle, confirmAddLabelAction,
}) => {
  const { t } = useTranslation();

  const confirmButtonClick = (priority) => {
    toggle();
    confirmAddLabelAction(priority);
  };

  return (
    <Modal zIndex="2001" returnFocusAfterClose={false} size="md" isOpen={open} toggle={toggle}>
      <StyledModalBody>
        {t('taskLabel.message')}
        <ButtonContainer>
          <StyledButton type="submit" onClick={() => confirmButtonClick('high')} priority="high">
            {t('taskLabel.high')}
          </StyledButton>
          <StyledButton type="submit" onClick={() => confirmButtonClick('medium')} priority="medium">
            {t('taskLabel.medium')}
          </StyledButton>
          <StyledButton type="submit" onClick={() => confirmButtonClick('low')} priority="low">
            {t('taskLabel.low')}
          </StyledButton>
          <StyledButton type="submit" onClick={() => confirmButtonClick('done')} priority="done">
            {t('taskLabel.done')}
          </StyledButton>
        </ButtonContainer>
      </StyledModalBody>
    </Modal>
  );
};

AddLabelModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  confirmAddLabelAction: PropTypes.func,
};

AddLabelModal.defaultProps = {
  open: false,
  toggle: null,
  confirmAddLabelAction: () => {},
};

export default AddLabelModal;
