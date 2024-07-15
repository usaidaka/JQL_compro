import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setLocale } from '@containers/App/actions';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import iconjql from '../../../public/iconjql.png';

import classes from './style.module.scss';
import DrawerRightNavMobile from './components';
import productsNavList from '../../static/data/productsNavList.json';

const Navbar = ({ title, locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [menuNavPosition, setMenuNavPosition] = useState(null);
  const open = Boolean(menuPosition);
  const openNav = Boolean(menuNavPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClickNav = (event) => {
    setMenuNavPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleCloseNav = () => {
    setMenuNavPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const onSelectNav = () => {
    // Navigating using useNavigate
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoHead}>
          <div className={classes.logoImage} onClick={goHome}>
            <img src={iconjql} alt="logo" className={classes.logo} />
            <div className={classes.title}>{title}</div>
          </div>
        </div>

        <div className={classes.navigationWrapper}>
          <div className={classes.navigator}>
            <Link to="/">
              <FormattedMessage id="nav_home" />
            </Link>
            <Link to="/">
              <FormattedMessage id="nav_about_us" />
            </Link>
            {/* -start- Our Product Toggle drop down */}
            <div className={classes.toolbar}>
              <div className={classes.toggle} onClick={handleClickNav}>
                <FormattedMessage id="nav_our_product" />
                <ArrowDropDownIcon />
              </div>
            </div>

            <Menu open={openNav} anchorEl={menuNavPosition} onClose={handleCloseNav}>
              {productsNavList.map((product) => (
                <MenuItem onClick={() => onSelectNav()}>
                  <div className={classes.menu}>
                    <span>{product.name}</span>
                  </div>
                </MenuItem>
              ))}
            </Menu>
            {/* -end- Our Product Toggle drop down */}
            <Link to="/">
              <FormattedMessage id="nav_contact" />
            </Link>
          </div>

          <div className={classes.toolbar}>
            <div className={classes.toggle} onClick={handleClick}>
              <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
              <div className={classes.lang}>{locale}</div>
              <ExpandMoreIcon />
            </div>
          </div>
          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>

          {/* Navigation for mobile */}
          <div className={classes.navigatorMobile}>
            <DrawerRightNavMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

export default Navbar;
