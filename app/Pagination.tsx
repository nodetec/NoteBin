"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "./Button";
import { IoChevronDown } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

export default function Pagination({ numPages }: any) {
  const searchParams = useSearchParams();
  const isSmallScreen = useMediaQuery({ minWidth: 640 });

  const pageSearchParam = searchParams.get("page");

  const currentPage = pageSearchParam ? parseInt(pageSearchParam) : 1;
  const router = useRouter();

  const navigate = (page: number) => {
    router.push(`/archive?page=${page}`);
  };

  return (
    <div className="flex justify-between gap-2 mt-4">
      <Button
        color="neutralLight"
        variant="outline"
        icon={<IoChevronDown className="rotate-90" />}
        size="sm"
        title="Previous page"
        onClick={() => navigate(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {isSmallScreen ? "Prev" : ""}
      </Button>

      <div className="flex items-center gap-2">
        {currentPage > 2 && (
          <Button
            color="neutralLight"
            variant="ghost"
            size="sm"
            onClick={() => navigate(1)}
          >
            1
          </Button>
        )}
        {currentPage > 3 && <span>...</span>}
        {[...Array(numPages + 1)].map((_, i) => {
          if (i === 0) return null;
          if (
            currentPage === i - 1 ||
            currentPage === i ||
            currentPage === i + 1
          ) {
            return (
              <Button
                key={i}
                color="neutralLight"
                variant={i === currentPage ? "solid" : "ghost"}
                size="sm"
                onClick={() => navigate(i)}
              >
                {i.toString()}
              </Button>
            );
          }
        })}
        {numPages > currentPage + 2 && <span>...</span>}
        {numPages >= currentPage + 2 && (
          <Button
            color="neutralLight"
            variant="ghost"
            size="sm"
            onClick={() => navigate(numPages)}
          >
            {numPages.toString()}
          </Button>
        )}
      </div>

      <Button
        color="neutralLight"
        variant="outline"
        icon={<IoChevronDown className="-rotate-90" />}
        title="Next page"
        size="sm"
        onClick={() => navigate(currentPage + 1)}
        disabled={currentPage >= numPages}
        iconAfter
      >
        {isSmallScreen ? "Next" : ""}
      </Button>
    </div>
  );
}
