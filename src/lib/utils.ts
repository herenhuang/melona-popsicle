import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useState, useEffect } from 'react';
import { SparklesText } from './ui/sparkles-text';
import { ArrowDown } from 'lucide-react';
import { ModeToggle } from './ModeToggle';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 