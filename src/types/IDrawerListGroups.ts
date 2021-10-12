import { ReactNode } from 'react';

export interface IDrawerListGroups {
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
