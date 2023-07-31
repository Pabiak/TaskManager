import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
} from 'reactstrap';

import { BiSolidLabel } from 'react-icons/bi';
import { BsThreeDots, BsPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
  PopupMenuContainer, StyledDropdownItem, StyledDropdownMenu, StyledDropdownToggle,
} from './PopupMenu.styles';

const PopupMenu = ({ onEditClick, onDeleteClick }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const toggle = () => setDropdownOpen((prev) => !prev);

  return (
    <PopupMenuContainer>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="end">
        <StyledDropdownToggle>
          <BsThreeDots />
        </StyledDropdownToggle>
        <StyledDropdownMenu>
          <StyledDropdownItem disabled>
            <BiSolidLabel />
            Dodaj etykietę
          </StyledDropdownItem>
          <StyledDropdownItem onClick={onEditClick}>
            <BsPencilFill />
            Edytuj
          </StyledDropdownItem>
          <StyledDropdownItem onClick={onDeleteClick}>
            <BsFillTrashFill />
            Usuń
          </StyledDropdownItem>
        </StyledDropdownMenu>
      </Dropdown>
    </PopupMenuContainer>
  );
};

export default PopupMenu;

PopupMenu.propTypes = {
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

PopupMenu.defaultProps = {
  onEditClick: () => {},
  onDeleteClick: () => {},
};
