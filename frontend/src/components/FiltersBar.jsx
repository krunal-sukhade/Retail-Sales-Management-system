import React from "react";

const selectClass = "filter-select";

function FiltersBar({ filters, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="filters-bar">
      {/* Customer Region */}
      <div className="filter-item">
        <label>Customer Region</label>
        <select
          className={selectClass}
          value={filters.region}
          onChange={(e) => handleChange("region", e.target.value)}
        >
          <option value="">All</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
      </div>

      {/* Gender */}
      <div className="filter-item">
        <label>Gender</label>
        <select
          className={selectClass}
          value={filters.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Age Range */}
      <div className="filter-item age-range">
        <label>Age Range</label>
        <div className="age-range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => handleChange("ageMin", e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => handleChange("ageMax", e.target.value)}
          />
        </div>
      </div>

      {/* Product Category */}
      <div className="filter-item">
        <label>Product Category</label>
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. Clothing"
          value={filters.productCategory}
          onChange={(e) => handleChange("productCategory", e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="filter-item">
        <label>Tags</label>
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. promo, festive"
          value={filters.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div className="filter-item">
        <label>Payment Method</label>
        <select
          className={selectClass}
          value={filters.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
        >
          <option value="">All</option>
          <option value="cash">Cash</option>
          <option value="credit card">Credit Card</option>
          <option value="debit card">Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      {/* Date Range (Figma shows a single Date dropdown, here a range) */}
      <div className="filter-item date-range">
        <label>Date</label>
        <div className="age-range-inputs">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
          />
          <span>–</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FiltersBar;
