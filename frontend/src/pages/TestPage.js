import React from 'react';

import Button from '@mui/material/Button'

const TestPage = () => {
  return (
    <div>
      <h1>Test Potato ( ͡° ͜ʖ ͡°)</h1>
      <Button
        size='medium'
        // disabled
        variant="contained"
        color="primary"
        onClick={() => alert('click')}>
        Text
      </Button>
    </div>
  );
};

export default TestPage;