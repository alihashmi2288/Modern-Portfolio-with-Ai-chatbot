import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  variant?: 'symbol' | 'lockup';
  ariaLabel?: string;
  tight?: boolean;
}

/**
 * BrandLogo - Bespoke identity for Syed Ali Hashmi
 * "The Terminal Apex" - An architectural 'A' embedding an upward terminal chevron
 * and negative-space deployment vector.
 * Adheres strictly to the Vercel Geist design system.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-6 h-6',
  size,
  variant = 'symbol',
  ariaLabel = 'Syed Ali Hashmi Logo',
  tight = true,
}) => {
  const viewBox = tight ? '28 26 200 200' : '0 0 256 256';

  if (variant === 'lockup') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <svg
          viewBox={viewBox}
          width={size || 28}
          height={size || 28}
          className="shrink-0 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={ariaLabel}
        >
          <path
            fillRule="evenodd"
            d="M 128.000 45.723 L 224.000 212.000 H 166.105 L 128.000 146.000 L 89.895 212.000 H 32.000 Z M 128.000 84.000 L 153.403 128.000 H 102.597 Z"
          />
        </svg>
        <span className="font-semibold text-base sm:text-lg tracking-[-0.4px] text-[#171717]">
          Syed Ali Hashmi
        </span>
      </div>
    );
  }

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M 128.000 45.723 L 224.000 212.000 H 166.105 L 128.000 146.000 L 89.895 212.000 H 32.000 Z M 128.000 84.000 L 153.403 128.000 H 102.597 Z"
      />
    </svg>
  );
};

export default BrandLogo;
