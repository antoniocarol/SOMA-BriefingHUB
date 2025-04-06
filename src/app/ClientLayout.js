"use client";

import { motion } from "framer-motion";

export default function ClientLayout({ children }) {
  return (
    <>
      {/* Background animado */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "url(/images/background2.svg) no-repeat center center fixed",
          backgroundSize: "cover",
        }}
      />
      {children}
    </>
  );
} 