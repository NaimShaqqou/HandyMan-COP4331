import React from 'react';

import {
  Divider,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import SearchResultCard from './SearchResultCard';

export default function SearchResultsList({results, focus, updateFocus}) {
  console.log(results);

  const theme = createTheme({
    typography: {
      fontFamily: [
        // 'Comfortaa',
        'Roboto',
        '"Helvetica"',
        'Arial',
        'sans-serif'
      ].join(','),
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ul
        style={{
          overflow: 'auto', // scroll bar
          height: '100%',
          // backgroundColor: 'green',
          paddingLeft: 5,
        }}
      >
        { (results && results.length > 0) ? results.map(listitem => (
          <li
            key={listitem._id} 
            style={{  }}
          >
            <SearchResultCard
              listitem={listitem} 
              focus={focus} 
              updateFocus={updateFocus}
            />
            <Divider />
          </li>
        )) : (
        <div>
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              paddingTop: 5,
            }}
          >
            No results found
          </Typography>
        </div>
        )}
      </ul>
    </ThemeProvider>
  )
}
