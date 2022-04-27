import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Box,
  Container,
  styled as stylesmui,
} from '@mui/material';

import { motion } from 'framer-motion';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: #003c80;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Marker = ({ service, focus, onClick }) => {
  const inFocus = focus && focus._id == service._id;

  return (
    <motion.div
      whileHover={{ scale: 2, zIndex: 1 }}
      onHoverStart={e => {}}
      onHoverEnd={e => {}}
      style={{
        position: 'absolute'
      }}
      onClick={onClick}
    >
      <Wrapper  />
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