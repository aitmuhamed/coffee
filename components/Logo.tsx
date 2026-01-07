
'use client';

import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'orange';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'orange', className = "w-12 h-12" }) => {
  // Variant colors based on the provided images
  const isLight = variant === 'light';
  
  // In the image, there's a version with a dark circle and orange/white details
  // and a version with white circle and dark details.
  const primaryColor = isLight ? '#ffffff' : (variant === 'dark' ? '#2c1e1a' : '#f39200');
  const secondaryColor = isLight ? '#2c1e1a' : (variant === 'orange' ? '#2c1e1a' : '#ffffff');
  const circleBg = variant === 'orange' ? '#2c1e1a' : 'transparent';

  return (
    <div className={`inline-flex items-center justify-center group cursor-pointer ${className}`}>
      <svg viewBox="0 0 512 512" className="w-full h-full">
        {/* Background Circle for the badge look */}
        {variant === 'orange' && (
          <circle cx="256" cy="256" r="250" fill={circleBg} />
        )}
        
        {/* Outer Circular Border */}
        <circle 
          cx="256" 
          cy="256" 
          r="240" 
          fill="none" 
          stroke={primaryColor} 
          strokeWidth="12" 
        />

        {/* Coffee Cup Icon at the top gap */}
        <g transform="translate(225, 65) scale(1.1)">
          {/* Steam */}
          <path 
            d="M25 5 Q30 -5 35 5" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          {/* Cup */}
          <path 
            d="M10 15 L40 15 Q48 15 48 22 L42 40 Q25 50 8 40 L2 22 Q2 15 10 15" 
            fill={primaryColor} 
          />
          {/* Handle */}
          <path 
            d="M48 20 Q58 20 58 28 Q58 35 45 35" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="4" 
          />
          {/* Bean detail inside cup */}
          <ellipse cx="25" cy="25" rx="7" ry="4" fill={secondaryColor} transform="rotate(-30 25 25)" />
          {/* Saucer */}
          <path 
            d="M0 45 Q25 55 50 45" 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
        </g>

        {/* The big "57" numbers */}
        <text 
          x="256" 
          y="235" 
          textAnchor="middle" 
          fill={primaryColor} 
          className="font-black"
          style={{ fontSize: '180px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          57
        </text>

        {/* Central Horizontal Banner */}
        <rect 
          x="10" 
          y="260" 
          width="492" 
          height="80" 
          fill={primaryColor} 
        />

        {/* "FIFTY SEVEN" Text on the banner */}
        <text 
          x="256" 
          y="322" 
          textAnchor="middle" 
          fill={secondaryColor} 
          className="font-black"
          style={{ fontSize: '70px', fontFamily: 'Impact, sans-serif', letterSpacing: '2px' }}
        >
          FIFTY SEVEN
        </text>

        {/* "COFFEE & FOOD" Bottom sub-section */}
        <g transform="translate(256, 385)">
          <text 
            x="0" 
            y="20" 
            textAnchor="middle" 
            fill={primaryColor} 
            className="font-bold"
            style={{ fontSize: '45px', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}
          >
            COFFEE
          </text>
          
          <text 
            x="0" 
            y="55" 
            textAnchor="middle" 
            fill={primaryColor} 
            className="font-bold"
            style={{ fontSize: '28px' }}
          >
            &
          </text>

          <g transform="translate(-5, 95)">
             <text 
              x="0" 
              y="0" 
              textAnchor="middle"
              fill={primaryColor} 
              className="font-bold"
              style={{ fontSize: '45px', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}
            >
              F O D
            </text>
            {/* Fork icon replacing the second 'O' or inside it */}
            <g transform="translate(-10, -28) scale(0.8)">
               <rect x="0" y="0" width="3" height="15" fill={primaryColor} />
               <rect x="5" y="0" width="3" height="15" fill={primaryColor} />
               <rect x="10" y="0" width="3" height="15" fill={primaryColor} />
               <path d="M0 15 Q6.5 25 13 15 L13 10 L0 10 Z" fill={primaryColor} />
               <rect x="5" y="20" width="3" height="15" fill={primaryColor} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
