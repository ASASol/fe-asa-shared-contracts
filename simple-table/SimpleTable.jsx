import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * SimpleTable Component - Table đơn giản không có container border
 * Phù hợp cho audit logs, user logs, và các table đơn giản
 */
const SimpleTable = ({
  data = [],
  columns = [],
  loading = false,
  pagination = null,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  renderRow = null,
  responsiveBreakpoint = 'sm',
  tableClassName = '',
  containerClassName = '',
  emptyMessage = 'Không có dữ liệu',
  loadingMessage = 'Đang tải...',
  showExtraColumn = true,
  zebra = true,
  renderMobileCard = null // Add support for custom mobile card rendering
}) => {
  const { t } = useTranslation();

  // DataTable Component - Using your existing pattern
  const DataTable = ({
    columns,
    data,
    loading,
    emptyMessage,
    renderRow,
    currentPage = 1,
    pageSize = 10,
    zebra = true
  }) => {
    if (loading) {
      return (
        <tr>
          <td colSpan={columns.length} className="px-6 py-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-gray-500 dark:text-gray-400">{loadingMessage}</span>
            </div>
          </td>
        </tr>
      );
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg 
                className="w-8 h-8 text-gray-300 dark:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m13 0H5" 
                />
              </svg>
              <span>{emptyMessage || t('common.noData')}</span>
            </div>
          </td>
        </tr>
      );
    }

    return (
      <>
        {data.map((item, index) => (
          <tr
            key={item.id || index}
            className={`transition-colors duration-200 ${
              zebra && index % 2 === 0
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-50 dark:bg-gray-750'
            } hover:bg-gray-100 dark:hover:bg-gray-600`}
          >
            {renderRow(item, index)}
          </tr>
        ))}
      </>
    );
  };

  // Default row renderer nếu không có custom render
  const defaultRenderRow = (item, index) => {
    return (
      <>
        {columns.map((col, colIndex) => (
          <td key={colIndex} className="px-6 py-3">
            <div className="text-gray-900 dark:text-gray-100">
              {item[col] || 'N/A'}
            </div>
          </td>
        ))}
        {showExtraColumn && (
          <td className="px-6 py-3">
            <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors duration-200">
              Xem chi tiết
            </button>
          </td>
        )}
      </>
    );
  };

  // Pagination Component - Using your existing pattern
  const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 20, 50]
  }) => {
    if (!totalItems || totalItems === 0) return null;

    const renderPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-2 mx-1 text-sm border rounded transition-colors duration-200 ${
              i === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            {i}
          </button>
        );
      }
      return pages;
    };

    return (
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              {t('pagination.rowsLabel') || 'Hiển thị'}
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-16 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('pagination.totalRowsLabel', { count: totalItems }) || `Tổng ${totalItems} kết quả`}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 mx-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title={t('pagination.firstPage') || 'Trang đầu'}
              >
                «
              </button>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 mx-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title={t('pagination.previousPage') || 'Trang trước'}
              >
                ‹
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 mx-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title={t('pagination.nextPage') || 'Trang sau'}
              >
                ›
              </button>
              <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 mx-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title={t('pagination.lastPage') || 'Trang cuối'}
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${containerClassName}`}>
      {/* Desktop Table View */}
      <div className={`hidden ${responsiveBreakpoint}:block overflow-x-auto`}>
        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm ${tableClassName}`}>
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="px-6 py-3 text-left font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xs"
                >
                  {col}
                </th>
              ))}
              {showExtraColumn && (
                <th className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-xs">
                  Thao tác
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <DataTable
              data={data}
              loading={loading}
              columns={showExtraColumn ? [...columns, 'actions'] : columns}
              currentPage={pagination?.currentPage || 1}
              pageSize={pagination?.pageSize || 10}
              emptyMessage={emptyMessage}
              renderRow={renderRow || defaultRenderRow}
              zebra={zebra}
            />
          </tbody>
        </table>
      </div>

      {/* Mobile View - Responsive Cards */}
      <div className={`${responsiveBreakpoint}:hidden space-y-3`}>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-500 dark:text-gray-400">{loadingMessage}</span>
          </div>
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={item.id || index}>
              {renderMobileCard ? renderMobileCard(item, index) : (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    {columns.map((col, colIndex) => (
                      <div key={colIndex} className="flex justify-between items-center py-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {col}:
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {item[col] || 'N/A'}
                        </span>
                      </div>
                    ))}
                    {showExtraColumn && (
                      <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-600">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium hover:underline transition-colors duration-200">
                          Xem chi tiết
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg 
                className="w-12 h-12 text-gray-300 dark:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m13 0H5" 
                />
              </svg>
              <span>{emptyMessage}</span>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
};

export default SimpleTable;

