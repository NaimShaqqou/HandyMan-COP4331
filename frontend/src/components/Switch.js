import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Switch.css";

import {
  Typography
} from '@mui/material';

/**
 * This is an example of layout animations in Framer Motion 2.
 *
 * It's as simple as adding a `layout` prop to the `motion.div`. When
 * the flexbox changes, the handle smoothly animates between layouts.
 *
 * Try adding whileHover={{ scale: 1.2 }} to the handle - the layout
 * animation is now fully compatible with user-set transforms.
 */

export default function Switch({value, onClick, style, width, height, text}) {
  // const [isOn, setIsOn] = useState(false);

  // const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div 
      className="switch"
      // style={{"width":"160px","height":"100px","backgroundColor":"rgba(255, 255, 255, 0.4)","display":"flex","justifyContent":"flex-start","borderRadius":"50px","padding":"10px","cursor":"pointer"}} 
      data-ison={value} 
      onClick={onClick}
      style={{
        ...style,
        width: width,
        height: height,
        pointerEvents: 'auto',
      }}
    >
      {/* <Typography sx={{ fontSize: '10px' }}>
        {text}
      </Typography> */}

      <motion.div 
        className="handle" 
        layout 
        transition={spring} 
        style={{
          position: 'absolute',
          height: (height - 20) + "px",
          width: (height - 20) + "px",
          "backgroundColor":"white",
          "borderRadius":"40px"
        }}
      />
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};
