import { FC, MouseEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import {
  Bell as BellIcon,
  AccountCircle as AccountCircleIcon,
} from 'mdi-material-ui';

export const ToolbarContent: FC = () => {
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const signOut = () => {
    handleClose();
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <Box marginLeft='auto'>
      <IconButton color='inherit' aria-label='notifications'>
        <BellIcon />
      </IconButton>
      <IconButton
        color='inherit'
        aria-label='account'
        edge='end'
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id='account-menu'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ToolbarContent;
