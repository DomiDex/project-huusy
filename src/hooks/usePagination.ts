'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps): UsePaginationReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get initial page from URL or use provided initial page
  const pageFromUrl = searchParams.get('page');
  const initialPageNumber = pageFromUrl ? parseInt(pageFromUrl, 10) : initialPage;
  
  const [currentPage, setCurrentPageState] = useState(
    isNaN(initialPageNumber) || initialPageNumber < 1 ? 1 : initialPageNumber
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate pagination bounds
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Update URL when page changes
  const updateUrl = useCallback((page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  const setCurrentPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPageState(validPage);
    updateUrl(validPage);
  }, [totalPages, updateUrl]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  // Reset to page 1 if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const pageFromUrl = searchParams.get('page');
    if (pageFromUrl) {
      const pageNumber = parseInt(pageFromUrl, 10);
      if (!isNaN(pageNumber) && pageNumber !== currentPage && pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPageState(pageNumber);
      }
    } else if (currentPage !== 1) {
      setCurrentPageState(1);
    }
  }, [searchParams, currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    setCurrentPage,
    nextPage,
    previousPage,
    goToPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
}