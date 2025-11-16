import React from "react";
import { motion } from "framer-motion";
import "./style.css";
const Title = ({ title }) => {
  return (
    <div>
      <motion.h1
        className="restaurant-title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default Title;
