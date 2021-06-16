import { ReactNode } from 'react';

export interface DrawerListGroupsOptions {
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
