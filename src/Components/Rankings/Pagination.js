import "./Rankings.css"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              className="page-link btn"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}