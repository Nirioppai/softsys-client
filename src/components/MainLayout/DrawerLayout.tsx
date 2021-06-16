import React, { FC, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useMainLayoutStyles } from './useMainLayoutStyles';
import { BrandContent } from './BrandContent';
import { DrawerListGroupsOptions } from '../../types';

export const DrawerLayout: FC<{
  drawerListGroups: DrawerListGroupsOptions[];
}> = ({ drawerListGroups }) => {
  const classes = useMainLayoutStyles();

  return (
    <div>
      <div className={classes.toolbar} style={{ padding: '1rem' }}>
        <BrandContent />
      </div>
      <Divider />
      <List disablePadding>
        {drawerListGroups.map((listGroup, listGroupIndex) => (
          <Fragment key={listGroupIndex}>
            <ListItem style={{ padding: 0 }}>
              <List style={{ width: '100%' }}>
                {listGroup.items.map((listItem, listItemIndex) => (
                  <ListItem
                    button
                    // @ts-ignore
                    component={NavLink}
                    to={listItem.link}
                    activeClassName='Mui-selected'
                    key={listItemIndex}
                  >
                    <ListItemIcon>{listItem.icon}</ListItemIcon>
                    <ListItemText>{listItem.name}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </ListItem>
            {listGroupIndex !== drawerListGroups.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default DrawerLayout;
