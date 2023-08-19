import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import {
  ButtonContainer, StyledModalBody, CalendarContainer, DateInput,
} from './addDeadlineModal.styles';

const AddDeadlineModal = ({
  open, toggle, confirmAddDeadlineAction,
}) => {
  const { t } = useTranslation();
  const [ today, setToday ] = useState('');
  const [ date, setDate ] = useState(null);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
  }, []);

  const confirmButtonClick = () => {
    toggle();
    confirmAddDeadlineAction(date);
  };

  return (
    <Modal zIndex="2001" returnFocusAfterClose={false} size="md" isOpen={open} toggle={toggle}>
      <StyledModalBody>
        {t('addDeadlineModal.message')}
        <CalendarContainer>
          <DateInput
            id="deadlineInput"
            name="deadlineInput"
            type="date"
            min={today}
            onChange={(e) => setDate(e.target.value)}
          />
          <ButtonContainer>
            <Button type="submit" onClick={toggle} color="secondary">
              {t('confirmDeleteModal.cancel')}
            </Button>
            <Button type="submit" onClick={confirmButtonClick} color="success">
              {t('confirmDeleteModal.confirm')}
            </Button>
          </ButtonContainer>
        </CalendarContainer>
      </StyledModalBody>
    </Modal>
  );
};

AddDeadlineModal.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  confirmAddDeadlineAction: PropTypes.func,
};

AddDeadlineModal.defaultProps = {
  open: false,
  toggle: null,
  confirmAddDeadlineAction: () => {},
};

export default AddDeadlineModal;
