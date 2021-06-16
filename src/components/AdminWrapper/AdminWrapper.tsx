import { FC } from 'react';
import MainLayout from '../MainLayout';
import { adminDrawerListGroups } from './adminDrawerListGroups';

const AdminWrapper: FC = (props) => {
  return <MainLayout drawerListGroups={adminDrawerListGroups} {...props} />;
};

export default AdminWrapper;
