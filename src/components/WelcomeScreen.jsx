"use client";
import React from "react";
import { motion } from "framer-motion";

export default function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center p-4 max-w-md text-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-3 md:mb-4">
        Bem-vindo ao Briefing da Soma!
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-6">
        Se você chegou até aqui, provavelmente assinou conosco.
        <br />
        Agradecemos seu interesse em nosso trabalho.
        <br />
        <strong>Atenção:</strong> não é obrigatório responder todo o formulário!
      </p>
    </motion.div>
  );
}
