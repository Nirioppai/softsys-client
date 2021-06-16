import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Hidden,
  Drawer,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Menu as MenuIcon } from 'mdi-material-ui';
import { useMainLayoutStyles } from './useMainLayoutStyles';
import { ToolbarContent } from './ToolbarContent';
import { DrawerLayout } from './DrawerLayout';
import { DrawerListGroupsOptions } from '../../types';

interface MainLayoutProps {
  children?: ReactNode;
  className?: string;
  drawerListGroups: DrawerListGroupsOptions[];
}

const MainLayout: FC<MainLayoutProps> = ({
  children,
  className,
  drawerListGroups,
  ...rest
}) => {
  const classes = useMainLayoutStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box {...rest} className={clsx(classes.root, className)}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box marginLeft='auto'>
            <ToolbarContent />
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='sidebar'>
        <Hidden lgUp>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <DrawerLayout drawerListGroups={drawerListGroups} />
          </Drawer>
        </Hidden>
        <Hidden mdDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            <DrawerLayout drawerListGroups={drawerListGroups} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth='lg' style={{ marginBottom: '1rem' }}>
          <>{children}</>
        </Container>
      </main>
    </Box>
  );
};

export default MainLayout;
