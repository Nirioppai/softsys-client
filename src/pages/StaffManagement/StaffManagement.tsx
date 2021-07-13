import { FC, useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, AppBar, Tab } from '@material-ui/core';
import { AdminWrapper } from 'components';
import { Dropzone } from '../../components';
import { TabPanel, TabList, TabContext } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import LocalDropzone from './LocalDropzone';
import Roles from './Roles';
import Permissions from './Permissions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogPaper: {
      backgroundColor: theme.palette.background.default,
    },
    appBar: {
      position: 'relative',
      marginBottom: theme.spacing(3),
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const StaffManagement: FC = () => {
  const classes = useStyles();
  const [currentTabValue, setCurrentTabValue] = useState<string>('0');
  const [navigable, setNavigable] = useState<boolean>(true);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: string) => {
    setCurrentTabValue(newValue);
  };

  const tabItems = [
    {
      name: 'Roles',
      component: <Roles />,
    },
    {
      name: 'Permissions',
      component: <Permissions />,
    },
  ];

  return (
    <AdminWrapper>
      <Helmet title='Staff Management' />

      <TabContext value={currentTabValue}>
        <AppBar position='static' color='transparent' elevation={0}>
          <TabList
            onChange={handleTabChange}
            aria-label='level info tabs'
            variant='scrollable'
          >
            {tabItems.map((tabItem, index) => (
              <Tab
                key={index}
                label={tabItem.name}
                value={index.toString()}
                disabled={!navigable && currentTabValue !== index.toString()}
              />
            ))}
          </TabList>
        </AppBar>

        {tabItems.map((tabItem, index) => (
          <TabPanel key={index} value={index.toString()}>
            <Typography variant='h1' gutterBottom>
              {tabItem.name}
            </Typography>
            {tabItem.component}
          </TabPanel>
        ))}
      </TabContext>
    </AdminWrapper>
  );
};

export default StaffManagement;
