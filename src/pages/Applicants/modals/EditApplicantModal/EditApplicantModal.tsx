import {
    FC,
    ChangeEvent,
    ReactElement,
    Ref,
    forwardRef,
    useState,
  } from 'react';
  import {
    Dialog,
    DialogProps,
    Slide,
    AppBar,
    Tab,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Box,
    Paper,
  } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TabPanel, TabList, TabContext } from '@material-ui/lab';
import { ArrowLeft as ArrowLeftIcon } from 'mdi-material-ui';
import { IApplicant } from 'types';
import { formatName } from 'utils';

// Applicant Info Fields
import { ApplicantInfo } from "./ApplicantInfo";
import { ApplicantStatusInfo } from './ApplicantStatusInfo'

interface EditApplicantModalProps extends DialogProps {
  onClose: () => void;
  onSave: (applicant: IApplicant) => void;
  applicant?: any;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement},
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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

export const EditApplicantModal: FC<EditApplicantModalProps> = ({
  applicant,
  onSave,
  onClose,
  ...rest
}) => {
  const classes = useStyles();
  const [currentTabValue, setCurrentTabValue] = useState<string>('0');
  const [navigable, setNavigable] = useState<boolean>(true);

  const handleTabChange = (event: ChangeEvent<{}>, newValue: string) => {
    setCurrentTabValue(newValue);
  };

  const tabItems = [
    {
      name: 'Applicant Info',
      component: (
        <ApplicantInfo 
          setNavigable={setNavigable}
          onSave={onSave}
          applicant={applicant}
        />
      )
    },
    {
      name: 'Application Status',
      component: (
        <ApplicantStatusInfo 
          setNavigable={setNavigable}
          onSave={onSave}
          applicant={applicant}
        />
      )
    }
  ]

  return (
    <Dialog
      {...rest}
      fullScreen
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{paper: classes.dialogPaper}}
      disableBackdropClick={!navigable}
      disableEscapeKeyDown={!navigable}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            edge='start'
            onClick={onClose}
            aria-label='close'
            disabled={!navigable}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography variant='h3' className={classes.title}>
            Edit Applicant
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg' style={{ marginBottom: '1rem' }}>
        <Box component='header' marginBottom={1}>
          <Typography variant='h1'>{formatName(applicant.name)}</Typography>
          <Typography variant='subtitle1'>
            {applicant.applicantNumber || '-'}
          </Typography>
        </Box>
        <Paper>
          <TabContext value={currentTabValue}>
            <AppBar position='static'>
              <TabList
                onChange={handleTabChange}
                aria-label='applicant info tabs'
                variant='scrollable'
              >
                {tabItems.map((tabItem, index) => (
                  <Tab 
                    key={index}
                    label={tabItem.name}
                    value={index.toString()}
                    disabled={
                      !navigable && currentTabValue !== index.toString()
                    }
                  />
                ))}
              </TabList>
            </AppBar>
            {tabItems.map((tabItem, index) => (
              <TabPanel key={index} value={index.toString()}>
                {tabItem.component}
              </TabPanel>
            ))}
          </TabContext>
        </Paper>
      </Container>
    </Dialog>
  )
}