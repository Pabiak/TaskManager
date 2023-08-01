import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Tooltip,
} from 'reactstrap';

import { BiSolidLabel } from 'react-icons/bi';
import { BsThreeDots, BsPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
  PopupMenuContainer, StyledDropdownItem, StyledDropdownMenu, StyledDropdownToggle,
} from './popupMenu.styles';

const PopupMenu = ({ id, onEditClick, onDeleteClick }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ menuTooltipOpen, setMenuTooltipOpen ] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => {
    if (prev) setMenuTooltipOpen(false);
    return !prev;
  });
  const toggleMenuTooltip = () => setMenuTooltipOpen(!menuTooltipOpen);
  return (
    <PopupMenuContainer>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction="end">
        <StyledDropdownToggle>
          {/* zindex needed to prevent tooltip flickering */}
          <BsThreeDots id={id} style={{ zIndex: '2000' }} />
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
      {dropdownOpen || <Tooltip isOpen={menuTooltipOpen} target={id} toggle={toggleMenuTooltip} placement="top">Otwórz menu</Tooltip>}
    </PopupMenuContainer>
  );
};

export default PopupMenu;

PopupMenu.propTypes = {
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  id: PropTypes.string,
};

PopupMenu.defaultProps = {
  onEditClick: () => {},
  onDeleteClick: () => {},
  id: '',
};
