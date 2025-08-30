import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type IPagination = {
  total: number;
  totalResults: number;
  page: number;
  resultsPerPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const PaginationWrapper = ({
  total,
  resultsPerPage,
  totalResults,
  page,
  totalPages,
  onPrev,
  onNext,
}: IPagination) => {
  const [lowBound, upBound] = [
    totalResults === 0 ? 0 : (page - 1) * resultsPerPage + 1,
    totalResults > page * resultsPerPage ? page * resultsPerPage : totalResults,
  ];
  return (
    <div className="flex items-center">
      <Pagination className="flex items-center gap-3 text-xs">
        <span className="font-normal">
          {lowBound} to {upBound} of {total}
        </span>
        <PaginationContent className="flex gap-3">
          <PaginationItem>
            <Button
              onClick={onPrev}
              disabled={page <= 1}
              className="!px-0 flex items-center justify-center bg-gray-200 disabled:bg-transparent hover:bg-transparent"
            >
              <PaginationPrevious className="text-black rounded-lg !py-0 text-xs" />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={page === totalPages}
              className="!px-0 flex items-center justify-center !bg-gray-200 disabled:bg-transparent"
              onClick={onNext}
            >
              <PaginationNext className="text-black rounded-lg !py-0 text-xs" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWrapper;
