import React from "react";

function FiltersPanel({ filters, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <aside className="filters-panel">
      <h2>Filters</h2>

      <div className="filter-group">
        <label>Customer Region (comma separated)</label>
        <input
          type="text"
          value={filters.region}
          onChange={(e) => handleChange("region", e.target.value)}
          placeholder="e.g. North, South"
        />
      </div>

      <div className="filter-group">
        <label>Gender (comma separated)</label>
        <input
          type="text"
          value={filters.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
          placeholder="e.g. Male,Female"
        />
      </div>

      <div className="filter-group filter-row">
        <div>
          <label>Age Min</label>
          <input
            type="number"
            value={filters.ageMin}
            onChange={(e) => handleChange("ageMin", e.target.value)}
          />
        </div>
        <div>
          <label>Age Max</label>
          <input
            type="number"
            value={filters.ageMax}
            onChange={(e) => handleChange("ageMax", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Product Category (comma separated)</label>
        <input
          type="text"
          value={filters.productCategory}
          onChange={(e) => handleChange("productCategory", e.target.value)}
          placeholder="e.g. Electronics,Clothing"
        />
      </div>

      <div className="filter-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={filters.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          placeholder="e.g. promo,clearance"
        />
      </div>

      <div className="filter-group">
        <label>Payment Method (comma separated)</label>
        <input
          type="text"
          value={filters.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          placeholder="e.g. Cash,Credit Card"
        />
      </div>

      <div className="filter-group filter-row">
        <div>
          <label>Date From</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
          />
        </div>
        <div>
          <label>Date To</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}

export default FiltersPanel;
