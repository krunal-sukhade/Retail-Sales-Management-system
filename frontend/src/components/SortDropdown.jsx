import React from "react";

function SortDropdown({ sort, onChange }) {
  const handleSortByChange = (e) => {
    onChange({ ...sort, sortBy: e.target.value });
  };

  const handleOrderChange = (e) => {
    onChange({ ...sort, sortOrder: e.target.value });
  };

  return (
    <div className="sort-dropdown">
      <label>Sort by</label>
      <div className="sort-controls">
        <select value={sort.sortBy} onChange={handleSortByChange}>
          <option value="customerName">Customer Name (A–Z)</option>
          <option value="date">Date (Newest)</option>
          <option value="quantity">Quantity</option>
        </select>
        <select value={sort.sortOrder} onChange={handleOrderChange}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  );
}

export default SortDropdown;
