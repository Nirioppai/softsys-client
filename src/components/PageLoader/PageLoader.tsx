import { FC } from 'react';
import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from '@material-ui/core';

interface PageLoaderProps extends CircularProgressProps {
  BoxProps?: BoxProps;
}

const PageLoader: FC<PageLoaderProps> = ({ BoxProps, ...rest }) => {
  return (
    <Box display='flex' justifyContent='center' width='100%' {...BoxProps}>
      <CircularProgress {...rest} />
    </Box>
  );
};

export default PageLoader;
