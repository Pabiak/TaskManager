import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
} from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { ButtonContainer, Title, StyledModalBody } from './confirmDeleteModal.styles';

const ConfirmDeleteModal = ({
  open, toggle, confirmDeleteAction, title,
}) => {
  const { t } = useTranslation();
  const confirmButtonClick = () => {
    toggle();
    confirmDeleteAction();
  };

  return (
    <Modal zIndex="2001" returnFocusAfterClose={false} size="md" isOpen={open} toggle={toggle}>
      <StyledModalBody>
        {t('confirmDeleteModal.title')}
        &nbsp;
        <Title>
          {title}
        </Title>
        ?
        <div>
          {t('confirmDeleteModal.warning')}
        </div>
        <ButtonContainer>
          <Button type="submit" onClick={toggle} color="secondary">
            {t('confirmDeleteModal.cancel')}
          </Button>
          <Button type="submit" onClick={confirmButtonClick} color="danger">
            {t('confirmDeleteModal.confirm')}
          </Button>
        </ButtonContainer>
      </StyledModalBody>
    </Modal>
  );
};

ConfirmDeleteModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  confirmDeleteAction: PropTypes.func,
  title: PropTypes.string,
};

ConfirmDeleteModal.defaultProps = {
  open: false,
  toggle: null,
  confirmDeleteAction: () => {},
  title: '',
};

export default ConfirmDeleteModal;
