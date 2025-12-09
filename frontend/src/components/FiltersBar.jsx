import React from "react";
import DropdownMultiSelect from "./DropdownMultiSelect";
import SortDropdown from "./SortDropdown";



const selectClass = "filter-select";
const inputClass = "filter-input";

function FiltersBar({ filters, onChange }) {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  // Helper: extract multiple selected values
  const getMultiValue = (e) =>
    Array.from(e.target.selectedOptions).map((opt) => opt.value).join(",");

  return (
    <div className="filters-bar">

      {/* Customer Region (MULTI-SELECT) */}
      <div className="filter-item">
        {/* <label>Customer Region</label> */}
        <DropdownMultiSelect
          label="Customer Region"
          value={filters.region}
          onChange={(v) => onChange({ region: v })}
          options={[
            { value: "north", label: "North" },
            { value: "south", label: "South" },
            { value: "east", label: "East" },
            { value: "west", label: "West" }
          ]}
        />

      </div>

      {/* Gender (MULTI-SELECT) */}
      <div className="filter-item">
        {/* <label>Gender</label> */}
        <DropdownMultiSelect
          label="Gender"
          value={filters.gender}
          onChange={(v) => onChange({ gender: v })}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />

      </div>

      {/* Age Range */}
      <div className="filter-item age-range">
        <label>Age Range</label>
        <div className="age-range-inputs">
          <input
            type="number"
            className={inputClass}
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => handleChange("ageMin", e.target.value)}
          />
          <span>–</span>
          <input
            type="number"
            className={inputClass}
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => handleChange("ageMax", e.target.value)}
          />
        </div>
      </div>

      {/* Product Category (MULTI via comma-separated input) */}
      <div className="filter-item">
        <label>Product Category</label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. Beauty, Clothing"
          value={filters.productCategory}
          onChange={(e) => handleChange("productCategory", e.target.value)}
        />
      </div>

      {/* Tags (MULTI via comma-separated) */}
      <div className="filter-item">
        <label>Tags</label>
        <input
          type="text"
          className={inputClass}
          placeholder="e.g. organic, festive"
          value={filters.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />
      </div>

      {/* Payment Method (MULTI-SELECT) */}
      <div className="filter-item">
        {/* <label>Payment Method</label> */}
        <DropdownMultiSelect
          label="Payment Method"
          value={filters.paymentMethod}
          onChange={(v) => onChange({ paymentMethod: v })}
          options={[
            { value: "cash", label: "Cash" },
            { value: "credit card", label: "Credit Card" },
            { value: "debit card", label: "Debit Card" },
            { value: "upi", label: "UPI" },
          ]}
        />

      </div>

      {/* Date Range */}
      <div className="filter-item date-range">
        <label>Date</label>
        <div className="age-range-inputs">
          <input
            type="date"
            className={inputClass}
            value={filters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
          />
          <span>–</span>
          <input
            type="date"
            className={inputClass}
            value={filters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
          />
        </div>
      </div>

      {/* <SortDropdown sort={sort} onChange={handleSortChange} /> */}

    </div>
  );
}

export default FiltersBar;
