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
  //   const searchParams = useSearchParams();
  //   const router = useRouter();
  //   const updateURLFromSearchQuery = useDebouncedCallback((page: number) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set("page", page.toString());
  //     params.set("resultsPerPage", resultsPerPage.toString());
  //     router.push(`?${params.toString()}`);
  //   }, 50);

  return (
    <div className="flex items-center">
      <Pagination className="flex items-center gap-3 text-xs">
        <div className="font-normal">
          {page} to {total} of {totalPages}
        </div>
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
