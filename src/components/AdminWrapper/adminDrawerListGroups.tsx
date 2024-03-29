import React from 'react';
import {
  Home as HomeIcon,
  AccountMultiplePlus as AccountMultiplePlusIcon,
  AccountGroup as AccountGroupIcon,
  Sitemap as SitemapIcon,
  CalendarAlert as CalendarAlertIcon,
  CalendarAccount as CalendarAccountIcon,
} from 'mdi-material-ui';
import { IDrawerListGroups } from 'types';

export const adminDrawerListGroups: IDrawerListGroups[] = [
  {
    name: 'Home',
    items: [
      {
        name: 'Home',
        icon: <HomeIcon />,
        link: '/home',
      },
    ],
  },
  {
    name: 'Administration',
    items: [
      {
        name: 'Applicants',
        icon: <AccountMultiplePlusIcon />,
        link: '/applicants',
      },
      {
        name: 'Employees',
        icon: <AccountGroupIcon />,
        link: '/employees',
      },
      {
        name: 'Organizational Chart',
        icon: <SitemapIcon />,
        link: '/organizational-chart',
      },
      {
        name: 'Requests',
        icon: <CalendarAlertIcon />,
        link: '/requests',
      },
      {
        name: 'Attendance',
        icon: <CalendarAccountIcon />,
        link: '/attendance',
      },
    ],
  },
];
