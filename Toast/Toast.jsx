// src/components/common/Toast.jsx - Với i18next
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const Toast = ({ type, message, isVisible, onClose, duration = 3000 }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-600',
          icon: 'text-green-600 dark:text-green-400',
          text: 'text-green-800 dark:text-green-300',
          iconPath: 'M5 13l4 4L19 7'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-600',
          icon: 'text-red-600 dark:text-red-400',
          text: 'text-red-800 dark:text-red-300',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-600',
          icon: 'text-yellow-600 dark:text-yellow-400',
          text: 'text-yellow-800 dark:text-yellow-300',
          iconPath: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
        };
      default:
        return {
          bg: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-600',
          icon: 'text-blue-600 dark:text-blue-400',
          text: 'text-blue-800 dark:text-blue-300',
          iconPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center p-4 rounded-lg border shadow-lg ${styles.bg} min-w-80 max-w-md`}>
        <svg className={`w-5 h-5 mr-3 flex-shrink-0 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={styles.iconPath} />
        </svg>
        <span className={`text-sm font-medium flex-1 ${styles.text}`}>{message}</span>
        <button
          onClick={onClose}
          className={`ml-4 flex-shrink-0 ${styles.icon} hover:opacity-75 transition-opacity duration-200`}
          aria-label={t('common.close')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;