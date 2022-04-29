import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Switch.css";

/**
 * This is an example of layout animations in Framer Motion 2.
 *
 * It's as simple as adding a `layout` prop to the `motion.div`. When
 * the flexbox changes, the handle smoothly animates between layouts.
 *
 * Try adding whileHover={{ scale: 1.2 }} to the handle - the layout
 * animation is now fully compatible with user-set transforms.
 */

export default function Switch({value, onClick, style}) {
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
        width: '160px',
        height: '100px'
      }}
    >
      <motion.div className="handle" layout transition={spring} style={{"width":"80px","height":"80px","backgroundColor":"white","borderRadius":"40px"}}/>
    </div>
  );
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};
