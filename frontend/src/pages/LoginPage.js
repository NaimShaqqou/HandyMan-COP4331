import React from 'react';

import PageTitle from '../components/PageTitle';
import Title from '../components/Title';
import LoginBox from '../components/LoginBox';
import RegisterBox from '../components/RegisterBox';
import ResponsiveAppBar from '../components/NavBar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {
  Box,
  Container
} from '@mui/material';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
import Switch from '@mui/material/Switch';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

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

const LoginPage = () =>
{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const boxStyle = {
    height: {
      sm: 300,
      md: 500 
    },
    minWidth: {
      sm: 385,
      md: 450
    },
    maxWidth: {
      lg: 450
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }

  const style1 = {
    width: {
      md: '100%',
      lg: '65%'
    },
    margin: '0 auto',
  }

  console.log(value);

  return(
    <div>
      <ResponsiveAppBar />
      {/* <div className='loginPageDiv'> */}
        <h2 style={{textAlign: 'center'}}>Welcome to Handler</h2>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="Log in" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </Box>

        <Box m={3}/>

        <Container maxWidth={false} sx={{...style1}}>
            <Grid container spacing={0}>
              <Grid item xs sx={{display:'flex', flexDirection:'row'}}>
                  <Slide direction="right" in={value == 0} mountOnEnter unmountOnExit>
                    <div>
                      <LoginBox sx={boxStyle}/>
                    </div>
                  </Slide>
              </Grid>

              <Grid item xs sx={{display:'flex', flexDirection:'row-reverse'}}>
                <Slide direction="left" in={value == 1} mountOnEnter unmountOnExit>
                  <div>
                    <RegisterBox sx={boxStyle} />
                  </div>
                </Slide>
              </Grid>
            </Grid>
        </Container>
    </div>
  );
};

const classes = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    textAlign: "center",
    backgroundColor: "white",
    color: "black"
  }
};

export default LoginPage;