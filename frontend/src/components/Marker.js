import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box,
  Container,
  styled as stylesmui,
} from '@mui/material';

import { motion } from 'framer-motion';

const Marker = ({ service, focus, onClick }) => {
  const inFocus = focus && focus._id == service._id;

  return (
    <motion.div
      whileHover={{ scale: 2, zIndex: 1 }}
      animate={{ 
        scale: inFocus ? 2 : 1,
        zIndex: inFocus ? 1 : 0,
        // backgroundColor: inFocus ? '#9000ff' : '#003c80',
      }}
      // transition={{ repeat: inFocus ? Infinity : 0, duration: 1 }}
      onHoverStart={e => {}}
      onHoverEnd={e => {}}
      style={{
        position: 'absolute',
      }}
      onClick={onClick}
    >
      {/* <Wrapper  /> */}

      <motion.div
        whileHover={{ backgroundColor: '#00eeff' }}
        animate={{
          backgroundColor: inFocus ? ['#003c80', '#00eeff', '#003c80'] : '#003c80',
          borderColor: inFocus ? ['#fff', '#003c80', '#fff'] : '#fff',
        }}
        transition={{ repeat: inFocus ? Infinity : 0, duration: 1.5 }}
        style={{
          "position":"absolute",
          "top":"50%",
          "left":"50%",
          "width":"18px",
          "height":"18px",
          // "backgroundColor":"#003c80",
          "border":"2px solid",
          "borderRadius":"100%",
          "userSelect":"none",
          "transform":"translate(-50%, -50%)",
          "cursor":"pointer"
        }}
      />
    </motion.div>
  )
};

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  // text: PropTypes.string.isRequired,
};

export default Marker;