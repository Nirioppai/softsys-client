import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
// @ts-ignore
import OrgTree from 'react-org-tree';

const horizontal = false;
const collapsable = true;
const expandAll = true;

const data = {
    id: 0,
    label: 'Edren - Hot guys',
    children: [{
        id: 1,
        label: 'Loui',
        children: [{
            id: 4,
            label: 'Nico'
        }, {
            id: 5,
            label: 'Franz'
        }, {
            id: 6,
            label: 'Carlo'
        }]
    }, {
        id: 2,
        label: 'Gemuel'
    }, {
        id: 3,
        label: 'Doc A - Aliping Sanguiguilid'
    }]
}

const OrganizationalChart: FC = () => {
  return (
    <AdminWrapper>
      <Helmet title='Organizational Chart' />
      <Typography variant='h1' gutterBottom>
        Organizational Chart
      </Typography>
      <Typography>Under construction</Typography>

      <OrgTree
        data={data}
        horizontal={horizontal}
        collapsable={collapsable}
        expandAll={expandAll}
      >'
      </OrgTree>

    </AdminWrapper>
  );
};

export default OrganizationalChart;
