// src/components/common/ConfirmDialog.jsx - Với i18next
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = 'danger' // 'danger', 'warning', 'info'
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      default:
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      default:
        return 'text-red-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"onClick={onCancel}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full transition-colors duration-200"onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <svg className={`w-6 h-6 ${getIconColor()} mr-3 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              {title}
            </h3>
          </div>
          {/* ✅ Fix lỗi HTML: Dùng div nếu message không phải string */}
          {typeof message === 'string' ? (
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-200">
              {message}
            </p>
          ) : (
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-6 transition-colors duration-200">
              {message}
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
            >
              {cancelText || t('common.cancel')}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${getButtonStyles()}`}
            >
              {confirmText || t('common.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};