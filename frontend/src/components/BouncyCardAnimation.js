import React from 'react'
import { motion, Variants } from "framer-motion";

export default function BouncyCardAnimation({children}) {
  const cardVariants = {
    offscreen: {
      y: 500,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={cardVariants}>
        {children}
      </motion.div>
    </motion.div>
  );
}
