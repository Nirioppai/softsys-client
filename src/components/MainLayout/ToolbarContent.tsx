import React, { FC } from 'react';
import { Box, IconButton } from '@material-ui/core';
import {
  Bell as BellIcon,
  AccountCircle as AccountCircleIcon,
} from 'mdi-material-ui';

export const ToolbarContent: FC = () => {
  return (
    <Box marginLeft='auto'>
      <IconButton color='inherit' aria-label='notifications'>
        <BellIcon />
      </IconButton>
      <IconButton color='inherit' aria-label='account' edge='end'>
        <AccountCircleIcon />
      </IconButton>
    </Box>
  );
};

export default ToolbarContent;
