"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ notification, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 md:px-6 py-2 md:py-3 
          rounded shadow-lg z-50 max-w-[90vw] md:max-w-md text-center
          ${notification.type === "error" ? "bg-red-500" : "bg-green-500"} 
          text-white text-sm md:text-base`}
      >
        {notification.message}
      </motion.div>
    </AnimatePresence>
  );
}
