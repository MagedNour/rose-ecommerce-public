"use client";

import React from 'react';

const StarRating = ({ rating, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`${sizeClasses[size]} ${i < rating ? 'text-pink-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;