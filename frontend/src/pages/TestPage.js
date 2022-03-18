import React from 'react';

import ResponsiveAppBar from '../components/NavBar';

const TestPage = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ResponsiveAppBar />
    </div>
  );
};

export default TestPage;