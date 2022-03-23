import React from 'react';

import PageTitle from '../components/PageTitle';
import Title from '../components/Title';
import LoginBox from '../components/LoginBox';
import RegisterBox from '../components/RegisterBox';
import ResponsiveAppBar from '../components/NavBar';
import '../LoginPage.css';
import RegisterBox2 from '../components/RegisterBox2';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
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

  return(
    <div>
      <ResponsiveAppBar />
      <div className='loginPageDiv'>
        {/* <Title /> */}
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
        <Grid container spacing={2}>
          <Grid item xs>
            <TabPanel value={value} index={0}>
            <Paper style={classes.paper}>
              <LoginBox />
              </Paper>
            </TabPanel>
          </Grid>
          <Grid item xs>
            <TabPanel value={value} index={1}>
            <Paper style={classes.paper}>
              <RegisterBox />
              </Paper>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
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