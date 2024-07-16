import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import productsNavList from '../../../static/data/productsNavList.json';

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
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }} role="presentation">
      <div className={classes.drawerRight}>
        <div
          className={classes.navDrawer}
          data-active={pathname === '/home' || pathname === '/'}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <Link to="/" data-active={pathname === '/home' || pathname === '/'}>
            <FormattedMessage id="nav_home" />
          </Link>
        </div>
        <div
          className={classes.navDrawer}
          data-active={pathname === '/home' || pathname === '/'}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <Link to="/" data-active={pathname === '/home' || pathname === '/'}>
            <FormattedMessage id="nav_about_us" />
          </Link>
        </div>
        <div className={classes.navigationWrapper}>
          <Accordion sx={{ boxShadow: 'none', border: 'none', margin: 0, padding: 0 }}>
            <AccordionSummary
              id="panel-header"
              aria-controls="panel-content"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <FormattedMessage id="nav_our_product" />
            </AccordionSummary>
            {productsNavList.map((product) => (
              <AccordionDetails key={product.name} sx={{ borderBottom: 'none' }}>
                {product.name}
              </AccordionDetails>
            ))}
          </Accordion>
        </div>
        <div
          className={classes.navDrawer}
          data-active={pathname === '/home' || pathname === '/'}
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
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
