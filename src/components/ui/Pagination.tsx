'use client';

import { useCallback } from 'react';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className 
}: PaginationProps) {
  const getPageNumbers = useCallback(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav 
      className={clsx('flex justify-center items-center space-x-1', className)}
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          'px-3 py-2 text-sm font-medium rounded-md transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:bg-gray-100 text-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex items-center space-x-1">
        {pageNumbers.map((number, index) => (
          <span key={index}>
            {number === '...' ? (
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(number as number)}
                className={clsx(
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  currentPage === number
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
                aria-label={`Go to page ${number}`}
                aria-current={currentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            )}
          </span>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          'px-3 py-2 text-sm font-medium rounded-md transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:bg-gray-100 text-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
        )}
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}