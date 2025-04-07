"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ThankYouScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center p-4 max-w-md text-center"
    >
      <img
        src="/images/logo2.svg"
        alt="Soma Logo"
        className="w-24 md:w-32 mb-4 md:mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4">
        Obrigado por confiar na Soma!
      </h1>
      <p className="text-base md:text-lg text-gray-700">
        Agradecemos por trabalhar conosco. Em breve entraremos em contato.
      </p>
    </motion.div>
  );
}
