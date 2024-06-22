import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

// eslint-disable-next-line react/function-component-definition
export default function DrawerRightNavMobile() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { pathname } = useLocation();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerRight}>
        <div className={classes.navDrawer} data-active={pathname === '/home' || pathname === '/'}>
          <Link to="/" data-active={pathname === '/home' || pathname === '/'}>
            <FormattedMessage id="nav_home" />
          </Link>
        </div>
        <div className={classes.navDrawer} data-active={pathname === '/home' || pathname === '/'}>
          <Link to="/" data-active={pathname === '/home' || pathname === '/'}>
            <FormattedMessage id="nav_about_us" />
          </Link>
        </div>
        <div className={classes.navDrawer} data-active={pathname === '/home' || pathname === '/'}>
          <Link to="/">
            <FormattedMessage id="nav_our_product" />
          </Link>
        </div>
        <div className={classes.navDrawer} data-active={pathname === '/home' || pathname === '/'}>
          <Link to="/">
            <FormattedMessage id="nav_contact" />
          </Link>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: '#757575' }} />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
