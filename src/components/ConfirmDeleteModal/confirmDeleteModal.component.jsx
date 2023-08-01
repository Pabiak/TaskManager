import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
} from 'reactstrap';

import { ButtonContainer, Title, StyledModalBody } from './confirmDeleteModal.styles';

const ConfirmDeleteModal = ({
  open, toggle, confirmDeleteAction, title,
}) => {
  const confirmButtonClick = () => {
    toggle();
    confirmDeleteAction();
  };

  return (
    <Modal zIndex="2001" returnFocusAfterClose={false} size="md" isOpen={open} toggle={toggle}>
      <StyledModalBody>
        Czy na pewno chcesz usunąć listę:&nbsp;
        <Title>
          {title}
        </Title>
        ?
        <ButtonContainer>
          <Button type="submit" onClick={toggle} color="secondary">
            Anuluj
          </Button>
          <Button type="submit" onClick={confirmButtonClick} color="danger">
            Potwierdź
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
