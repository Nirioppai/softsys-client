import React from 'react';
import {
  Home as HomeIcon,
  AccountMultiplePlus as AccountMultiplePlusIcon,
  AccountGroup as AccountGroupIcon,
  Sitemap as SitemapIcon,
  CalendarAlert as CalendarAlertIcon,
  CalendarAccount as CalendarAccountIcon,
  CalendarMonth as CalendarMonthIcon,
  AccountCheck as AccountCheckIcon,
  CalendarText as CalendarTextIcon,
  Qrcode as QrcodeIcon
} from 'mdi-material-ui';
import { DrawerListGroupsOptions } from '../../types';

export const adminDrawerListGroups: DrawerListGroupsOptions[] = [
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
    ],
  },
  {
    name: 'Attendance',
    items: [
      {
        name: 'Attendance Dashboard',
        icon: <CalendarAccountIcon />,
        link: '/attendance/dashboard',
      },
      {
        name: 'Attendance Overview',
        icon: <AccountCheckIcon />,
        link: '/attendance/overview',
      },
      {
        name: 'Daily Management',
        icon: <CalendarMonthIcon />,
        link: '/attendance/daily-management',
      },
      {
        name: 'Daily Attendance',
        icon: <CalendarTextIcon />,
        link: '/attendance/daily-attendance',
      },
      {
        name: 'Attendance QR',
        icon: <QrcodeIcon />,
        link: '/attendance/qr',
      },
    ],
  },
];
