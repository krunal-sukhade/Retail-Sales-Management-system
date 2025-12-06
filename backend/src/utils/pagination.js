function applyPagination(items, page, limit) {
  const pageSize = limit && limit > 0 ? limit : 10;
  const currentPage = page && page > 0 ? page : 1;

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(currentPage, totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage: safePage,
    pageSize
  };
}

module.exports = {
  applyPagination
};
