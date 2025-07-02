"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils/cn";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProductsPaginationProps = {
  totalPages: number;
};

export default function ProductsPagination({ totalPages }: ProductsPaginationProps) {
  // Variables
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve the page number from URL search params
  const pageFromParams = Number(searchParams.get("page"));
  const initialPage = pageFromParams > 0 && pageFromParams <= totalPages ? pageFromParams : 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Sync URL when currentPage changes
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(currentPage));
    router.push(`?${params.toString()}`);
  }, [currentPage, searchParams, router]);

  //update the current page if it's within range
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to generate an array of page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    // Always show first page
    pages.push(1);

    // Add ellipsis if currentPage - 1 is more than 2 page away from first
    if (currentPage - 1 > 2) {
      pages.push("...");
    }

    // Show previous page (if valid and not already included)
    if (currentPage - 1 > 1) {
      pages.push(currentPage - 1);
    }

    // Show current page (if not first or last)
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }

    // Show next page (if valid and not already included)
    if (currentPage + 1 < totalPages) {
      pages.push(currentPage + 1);
    }

    // Add ellipsis if currentPage + 1 is more than 2 pages away from last
    if (currentPage + 1 < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page (if more than one page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Page Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => goToPage(currentPage - 1)}
            className={cn(totalPages && "cursor-not-allowed pointer-events-none")}
          />
        </PaginationItem>

        {/* Page Number Buttons */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={() => goToPage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => goToPage(currentPage + 1)}
            className={cn(totalPages && "cursor-not-allowed pointer-events-none")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
