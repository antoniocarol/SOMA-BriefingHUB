"use client";
import React from "react";

export default function ThankYouScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
      <img
        src="/images/logo2.svg"
        alt="Soma Logo"
        className="w-24 md:w-32 mb-4 md:mb-6"
      />
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4 text-center">
        Obrigado por confiar na Soma!
      </h1>
      <p className="text-base md:text-lg text-gray-700 text-center max-w-md">
        Agradecemos por trabalhar conosco. Em breve entraremos em contato.
      </p>
    </div>
  );
}
