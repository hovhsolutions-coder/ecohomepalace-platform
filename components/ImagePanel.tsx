'use client';

import { useState } from 'react';

interface ImagePanelProps {
  imageUrl: string;
  alt: string;
  overlay?: 'dark-green' | 'dark' | 'light' | 'none';
  badge?: string;
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  hoverZoom?: boolean;
  fallbackUrl?: string;
}

const overlays = {
  'dark-green': 'bg-gradient-to-t from-[#0b2a22] via-[rgba(11,42,34,0.5)] to-transparent',
  'dark': 'bg-gradient-to-t from-black/70 via-black/30 to-transparent',
  'light': 'bg-gradient-to-t from-white/50 via-white/20 to-transparent',
  'none': '',
};

export default function ImagePanel({ 
  imageUrl, 
  alt, 
  overlay = 'dark-green', 
  badge,
  badgePosition = 'bottom-right',
  className = '',
  hoverZoom = true,
  fallbackUrl = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800'
}: ImagePanelProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const badgePositions = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${hoverZoom ? 'group' : ''} ${className}`}>
      {/* Image or fallback */}
      <img 
        src={imageError ? fallbackUrl : imageUrl} 
        alt={alt}
        className={`w-full h-full object-cover ${hoverZoom ? 'group-hover:scale-105 transition-transform duration-700' : ''} ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b2a22] to-[#061f18] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[rgba(33,196,93,0.3)] border-t-[#21c45d] rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlays[overlay]}`}></div>
      )}
      
      {/* Badge */}
      {badge && (
        <div className={`absolute ${badgePositions[badgePosition]} bg-[rgba(11,42,34,0.9)] backdrop-blur-md px-4 py-2 rounded-lg border border-[rgba(33,196,93,0.3)] shadow-lg`}>
          <p className="text-sm font-semibold text-white">{badge}</p>
        </div>
      )}
    </div>
  );
}
