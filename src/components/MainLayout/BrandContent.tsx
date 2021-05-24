import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export const BrandContent = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Avatar
          style={{
            width: theme.spacing(4),
            height: theme.spacing(4),
            backgroundColor: theme.palette.primary.main,
          }}
        >
          H
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant='h5' style={{ lineHeight: 1.2 }}>
          Human Resource Information System
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BrandContent;
