import React from 'react';

import LoginBox from '../components/LoginBox';
import RegisterBox from '../components/RegisterBox';
import ResponsiveAppBar from '../components/NavBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  Box,
  Container,
  styled,
} from '@mui/material';
import Grid from "@mui/material/Grid";
import Slide from '@mui/material/Slide';

import { makeStyles } from '@mui/styles';

import { motion, AnimatePresence } from 'framer-motion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    // backgroundColor: '#635ee7',
    backgroundColor: '#0064ad',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'steelblue',
    // color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      // color: '#fff',
      color: 'cyanblue',
      fontWeight: theme.typography.fontWeightBold,
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

const LoginPage = () =>
{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const boxStyle = {
    minHeight: '500px',
    width: {
      xs: 385,
      sm: 385,
      md: 450
    },
    // pt: 10
  }

  return(
    <Box>
      {/* <ResponsiveAppBar /> */}

      <Box m={5}/>

      <Typography 
        variant='h4' 
        sx={{ 
          textAlign: 'center', 
          color: '#0064ad', 
          fontWeight: 'bold',
          fontFamily: 'Comfortaa'
        }}
      >
        Welcome to Handler
      </Typography>

      <Box m={3}/>

      <Box
        sx={{
          // bgcolor: '#2e1534',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
          centered
        >
          <StyledTab label="Log in" />
          <StyledTab label="Register" />
        </StyledTabs>
      </Box>

      <Box m={7}/>

      <Container 
        maxWidth={false} 
        sx={{
          width: {
            xs: '90%',
            sm: '90%',
            md: '90%',
            lg: '50%',
            // xl: '65%'
          },
          // margin: '0 auto',
          position: 'relative'
        }}
      >
          {/* <Grid container spacing={0} wrap='nowrap'>
            <Grid item xs sx={{display:'flex', flexDirection:'row'}}> */}
                <Slide direction="right" in={value == 0} mountOnEnter unmountOnExit>
                  <motion.div 
                    style={{
                      display: 'inline-block', 
                      position: 'absolute', 
                      left: 0
                    }}
                    // uncomment the following for fun mode:
                    // drag
                    // dragConstraints={{
                    //   top: 0,
                    //   left: 0,
                    //   right: 0,
                    //   bottom: 0,
                    // }}
                  >
                    <LoginBox sx={boxStyle}/>
                  </motion.div>
                </Slide>
            {/* </Grid> */}

            {/* <Grid item xs sx={{display:'flex', flexDirection:'row-reverse'}}> */}
              <Slide direction="left" in={value == 1} mountOnEnter unmountOnExit>
                <div 
                  style={{
                    display: 'inline-block', 
                    position: 'absolute', 
                    right: 0
                  }}
                >
                  <RegisterBox sx={boxStyle} />
                </div>
              </Slide>
            {/* </Grid>
          </Grid> */}
      </Container>
    </Box>
  );
};

export default LoginPage;