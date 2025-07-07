import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BackToTop = ({
  showAfter = 300,
  position = 'bottom-right',
  size = 'md',
  variant = 'primary',
  shape = 'circle',
  showProgress = false,
  icon = 'chevron',
  customClass = '',
  onClick = null,
  tooltip = null, // Will use i18n if null
  smooth = true,
  duration = 500
}) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use i18n tooltip if not provided
  const tooltipText = tooltip || t('common.backToTop');

  // Theo dõi scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Hiển thị nút khi scroll qua showAfter pixels
      setIsVisible(scrolled > showAfter);
      
      // Tính progress percentage
      if (showProgress) {
        const progress = (scrolled / maxHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter, showProgress]);

  // Hàm scroll to top
  const scrollToTop = () => {
    if (onClick) {
      onClick();
    }

    if (smooth) {
      // Smooth scroll với easing
      const startPosition = window.pageYOffset;
      const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animateScroll = (currentTime) => {
        const timeElapsed = currentTime - startTime;
        const ease = easeInOutQuad(timeElapsed, startPosition, -startPosition, duration);
        
        window.scrollTo(0, ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Get position classes
  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
    };
    return positions[position] || positions['bottom-right'];
  };

  // Get size classes
  const getSizeClasses = () => {
    const sizes = {
      'sm': 'w-11 h-11 text-sm',
      'md': 'w-14 h-14 text-base',
      'lg': 'w-16 h-16 text-lg'
    };
    return sizes[size] || sizes['md'];
  };

  // Get variant classes với nhiều style đẹp hơn
  const getVariantClasses = () => {
    const variants = {
      'primary': `
        bg-gradient-to-r from-blue-500 to-blue-600 
        hover:from-blue-600 hover:to-blue-700 
        text-white shadow-lg hover:shadow-2xl
        border border-blue-400/50
        backdrop-blur-sm
      `,
      'secondary': `
        bg-gradient-to-r from-gray-500 to-gray-600 
        hover:from-gray-600 hover:to-gray-700 
        text-white shadow-lg hover:shadow-2xl
        border border-gray-400/50
        backdrop-blur-sm
      `,
      'dark': `
        bg-gradient-to-r from-gray-800 to-gray-900 
        hover:from-gray-900 hover:to-black 
        text-white shadow-xl hover:shadow-2xl
        border border-gray-600/50
        backdrop-blur-sm
      `,
      'gradient': `
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        hover:from-purple-600 hover:via-pink-600 hover:to-red-600
        text-white shadow-xl hover:shadow-2xl
        border border-purple-400/50
        backdrop-blur-sm
        animate-pulse hover:animate-none
      `,
      'glass': `
        bg-white/20 dark:bg-gray-800/20 
        hover:bg-white/30 dark:hover:bg-gray-700/30
        text-gray-800 dark:text-white
        shadow-xl hover:shadow-2xl
        border border-white/30 dark:border-gray-600/30
        backdrop-blur-md backdrop-saturate-150
      `,
      'neon': `
        bg-gradient-to-r from-cyan-500 to-blue-500
        hover:from-cyan-400 hover:to-blue-400
        text-white shadow-lg hover:shadow-cyan-500/25
        border border-cyan-400/50
        backdrop-blur-sm
        shadow-[0_0_20px_rgba(6,182,212,0.3)]
        hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
      `
    };
    return variants[variant] || variants['primary'];
  };

  // Get shape classes
  const getShapeClasses = () => {
    const shapes = {
      'circle': 'rounded-full',
      'square': 'rounded-none',
      'rounded': 'rounded-2xl'
    };
    return shapes[shape] || shapes['circle'];
  };

  // Get icon component với icons đẹp hơn
  const getIcon = () => {
    const iconClass = size === 'sm' ? "w-4 h-4" : size === 'lg' ? "w-6 h-6" : "w-5 h-5";
    
    const icons = {
      'arrow': (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      'chevron': (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      ),
      'arrowUp': (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ),
      'rocket': (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
        </svg>
      )
    };
    
    return icons[icon] || icons['chevron'];
  };

  // Progress circle component với style đẹp hơn
  const ProgressCircle = () => {
    if (!showProgress) return null;
    
    const radius = size === 'sm' ? 18 : size === 'lg' ? 26 : 22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;
    
    return (
      <svg
        className="absolute inset-0 w-full h-full transform -rotate-90"
        viewBox="0 0 56 56"
      >
        {/* Background circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out opacity-80"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="group relative">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed z-50 flex items-center justify-center
          transition-all duration-300 ease-out
          transform hover:scale-110 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
          ${getPositionClasses()}
          ${getSizeClasses()}
          ${getVariantClasses()}
          ${getShapeClasses()}
          ${customClass}
          ${isHovered ? 'rotate-6' : 'rotate-0'}
        `}
        aria-label={tooltipText}
        title={tooltipText}
      >
        {/* Progress Circle */}
        <ProgressCircle />
        
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        
        {/* Icon */}
        <span className={`
          relative z-10 transition-transform duration-300
          ${isHovered ? 'transform -translate-y-0.5' : ''}
        `}>
          {getIcon()}
        </span>
        
        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-110 transition-transform duration-200"></div>
      </button>
      
      {/* Enhanced Tooltip */}
      <div className={`
        fixed z-40 px-3 py-2 text-xs font-medium text-white 
        bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg
        opacity-0 group-hover:opacity-100 transition-all duration-300
        pointer-events-none whitespace-nowrap
        shadow-lg border border-gray-600/50 backdrop-blur-sm
        ${position.includes('right') ? 'right-20' : position.includes('left') ? 'left-20' : 'left-1/2 transform -translate-x-1/2'}
        ${position.includes('bottom') ? 'bottom-8' : 'top-8'}
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}>
        {tooltipText}
        {/* Tooltip arrow */}
        <div className={`
          absolute w-2 h-2 bg-gradient-to-r from-gray-800 to-gray-900 transform rotate-45
          ${position.includes('right') ? 'right-2' : position.includes('left') ? 'left-2' : 'left-1/2 transform -translate-x-1/2'}
          ${position.includes('bottom') ? '-bottom-1' : '-top-1'}
        `}></div>
      </div>

      {/* Floating particles effect (chỉ hiện khi hover) */}
      {isHovered && variant === 'gradient' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 bg-white rounded-full
                animate-ping opacity-60
                ${i % 2 === 0 ? 'animate-pulse' : ''}
              `}
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${15 + (i * 8)}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BackToTop;