import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Tooltip,
} from 'reactstrap';

import { useTranslation } from 'react-i18next';
import { BiSolidLabel } from 'react-icons/bi';
import { BsThreeDots, BsPencilFill, BsFillTrashFill } from 'react-icons/bs';
import {
  PopupMenuContainer, StyledDropdownItem, StyledDropdownMenu, StyledDropdownToggle,
} from './popupMenu.styles';

const PopupMenu = ({ id, onEditClick, onDeleteClick, onAddLabelClick }) => {
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ menuTooltipOpen, setMenuTooltipOpen ] = useState(false);
  const { t } = useTranslation();

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
          <StyledDropdownItem onClick={onAddLabelClick}>
            <BiSolidLabel />
            {t('popupMenu.addLabel')}
          </StyledDropdownItem>
          <StyledDropdownItem onClick={onEditClick}>
            <BsPencilFill />
            {t('popupMenu.edit')}
          </StyledDropdownItem>
          <StyledDropdownItem onClick={onDeleteClick}>
            <BsFillTrashFill />
            {t('popupMenu.delete')}
          </StyledDropdownItem>
        </StyledDropdownMenu>
      </Dropdown>
      {dropdownOpen || <Tooltip isOpen={menuTooltipOpen} target={id} toggle={toggleMenuTooltip} placement="top">{t('toolTip.openMenu')}</Tooltip>}
    </PopupMenuContainer>
  );
};

export default PopupMenu;

PopupMenu.propTypes = {
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onAddLabelClick: PropTypes.func,
  id: PropTypes.string,
};

PopupMenu.defaultProps = {
  onEditClick: () => {},
  onDeleteClick: () => {},
  onAddLabelClick: () => {},
  id: '',
};
