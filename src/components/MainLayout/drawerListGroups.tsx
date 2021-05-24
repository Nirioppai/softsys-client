import React, { ReactNode } from 'react';
import {
  Home as HomeIcon,
  AccountMultiplePlus as AccountMultiplePlusIcon,
  AccountGroup as AccountGroupIcon,
  Sitemap as SitemapIcon,
  CalendarAlert as CalendarAlertIcon,
  CalendarAccount as CalendarAccountIcon,
} from 'mdi-material-ui';

interface drawerListGroupsOptions {
  name: string;
  items: {
    name: string;
    icon: ReactNode;
    link?: string;
    items?: {
      name: string;
      icon: ReactNode;
      link: string;
    }[];
  }[];
}

export const drawerListGroups: drawerListGroupsOptions[] = [
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
