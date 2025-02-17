"use client";

import { motion } from "framer-motion";

interface SabbaticalNoteProps {
  isPersonal: boolean;
}

export function SabbaticalNote({ isPersonal }: SabbaticalNoteProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="mt-4 mb-8"
    >
      {isPersonal ? (
        <div className="font-inter text-lg text-gray-600">
          <span className="inline-block animate-float">🌱</span>{" "}
          <span className="italic">
            currently on an adult gap year, exploring and finding inspiration
          </span>
        </div>
      ) : (
        <div className="font-inter text-lg text-gray-600">
          Currently on sabbatical, taking time to explore new perspectives and opportunities.
        </div>
      )}
    </motion.div>
  );
} 