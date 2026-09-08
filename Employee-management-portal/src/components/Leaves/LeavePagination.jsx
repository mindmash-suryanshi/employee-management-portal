import "../../styles/LeavePagination.css";
const LeavePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="leave-pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            type="button"
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default LeavePagination;
