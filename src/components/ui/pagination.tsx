import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type PaginatinProps = {
  currentPage: number,
  totalFilteredPages: number,
  handlePageChange : (currentPage: number)=> void,
}
const Pagination = ({currentPage,totalFilteredPages, handlePageChange  }: PaginatinProps) => {
  return (
    <div>
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LuChevronLeft className="h-5 w-5" />
          </button>

          {Array.from({ length: totalFilteredPages }).map((_, index) => {
            const page = index + 1;

            // Show first page, last page, current page, and pages around current page
            if (
              page === 1 ||
              page === totalFilteredPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }

            // Show ellipsis for skipped pages
            if (
              (page === 2 && currentPage > 3) ||
              (page === totalFilteredPages - 1 &&
                currentPage < totalFilteredPages - 2)
            ) {
              return (
                <span key={page} className="px-2">
                  ...
                </span>
              );
            }

            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalFilteredPages}
            className={`p-2 rounded-md ${
              currentPage === totalFilteredPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LuChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
