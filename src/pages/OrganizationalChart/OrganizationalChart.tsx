import { FC, SetStateAction, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Typography } from '@material-ui/core';
import { AdminWrapper } from 'components';
// @ts-ignore
import OrgTree from 'react-org-tree';
import { generateOrgChart, getOrgChart } from '../../services/orgChart';

const horizontal = true;
const collapsable = true;
const expandAll = true;

const data = {
  id: 0,
  label: 'Francis Robredo - Board of Directors',
  children: [
    {
      id: 1,
      label: 'Rodrigo Marcos - Managing Director',
      children: [
        {
          id: 2,
          label: 'Mar Duterte - Director Audit & Assurance',
        },
        {
          id: 3,
          label: 'Kris Fernandez - Company Secretary',
        },
        {
          id: 4,
          label: 'Benigno Lacson - Director Finance',
          children: [
            {
              id: 10,
              label: 'Kawhi Leonard - Finance Director',
              children: [
                {
                  id: 11,
                  label: 'Gemuel Nicolas - Finance Officer',
                },
              ],
            },
            {
              id: 12,
              label: 'Carlo Rosatase - Financial Controller',
              children: [
                {
                  id: 13,
                  label: 'Jeremy Aguilar - Accounts Officer',
                },
              ],
            },
          ],
        },
        {
          id: 5,
          label: 'Tito Abunda - Director Administration',
          children: [
            {
              id: 14,
              label: 'Nico Liwag - HR Manager',
            },
            {
              id: 19,
              label: 'Genesia Delacroix - Logistic Manager',
              children: [
                {
                  id: 21,
                  label: 'Etania Dionisio - Procurement Officer',
                  children: [
                    {
                      id: 23,
                      label: 'Ulva Petrella - Support Staff',
                    },
                  ],
                },
                {
                  id: 22,
                  label: 'Gamble Cape - Stores Manager',
                  children: [
                    {
                      id: 24,
                      label: 'Aditya Gaither - Support Staff',
                    },
                  ],
                },
              ],
            },
            {
              id: 20,
              label: 'Virgilia Payton - Affairs Manager',
            },
          ],
        },
        {
          id: 6,
          label: 'Chito Miranda - Director Planning',
          children: [
            {
              id: 15,
              label: 'Franz Del Rosario - Investment Manager',
            },
            {
              id: 25,
              label: 'Kingsley Breault - Monitoring Manager',
            },
          ],
        },
        {
          id: 7,
          label: 'Eric Spoelstra - Director Management',
          children: [
            {
              id: 16,
              label: 'Loui Ang - Stores Officer',
              children: [
                {
                  id: 27,
                  label: 'Kingsley Breault - Store Assistant',
                  children: [
                    {
                      id: 29,
                      label: 'Cane Jaeger - Store Staff',
                    },
                  ],
                },
              ],
            },
            {
              id: 26,
              label: 'Zenon Blanc - App Manager',
              children: [
                {
                  id: 28,
                  label: 'Virgilia Payton - Store Assistant',
                  children: [
                    {
                      id: 29,
                      label: 'Sam Smith - Store Staff',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 8,
          label: 'Gregg Popovich - Director Projects',
          children: [
            {
              id: 17,
              label: 'Eric Enorme - Project Manager',
              children: [
                {
                  id: 30,
                  label: 'Jennifer Del Rosario - Technical Assistant',
                  children: [
                    {
                      id: 31,
                      label: 'Augustus Tan - Support Staff',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 9,
          label: 'Steve Kerr - Director Engineering',
          children: [
            {
              id: 18,
              label: 'John Fernandez - IT Engineer',
              children: [
                {
                  id: 33,
                  label: 'Joyce Nicolas - Senior Frontend Developer',
                  children: [
                    {
                      id: 34,
                      label: 'Almirra Lazo - Junior Frontend Developer',
                      children: [
                        {
                          id: 35,
                          label: ' Alyssa Aloba - Frontend Intern',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 32,
              label: 'Fernando Santos - Senior Backend Developer',
              children: [
                {
                  id: 36,
                  label: 'Ken Bernardo - Junior Backend Developer',
                  children: [
                    {
                      id: 37,
                      label: 'Joshua Montes - Backend Intern',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const OrganizationalChart: FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    getOrgChart().then((res) => {
      if (res.data.data.length > 0) {
        setShow(false);
      }
    });
  }, []);

  return (
    <AdminWrapper>
      <Helmet title='Organizational Chart' />
      <Typography variant='h1' gutterBottom>
        Organizational Chart
      </Typography>

      {show && (
        <Button
          variant='contained'
          onClick={() => {
            generateOrgChart(data);
            setShow(false);
          }}
        >
          Generate Org Chart
        </Button>
      )}

      <OrgTree
        data={data}
        horizontal={horizontal}
        collapsable={collapsable}
        expandAll={expandAll}
      ></OrgTree>
    </AdminWrapper>
  );
};

export default OrganizationalChart;
