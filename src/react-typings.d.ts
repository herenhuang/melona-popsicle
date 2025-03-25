import React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
  
  interface ImgHTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
} 