import React from "react";

function formatCurrency(value) {
  if (!value) return "₹0";
  return (
    "₹" +
    value.toLocaleString("en-IN", {
      maximumFractionDigits: 0
    })
  );
}

function StatsCards({ totalUnits, totalAmount, totalDiscount, totalRecords }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-title">Total units sold</div>
        <div className="stat-value">{totalUnits}</div>
        <div className="stat-sub">On this page</div>
      </div>

      <div className="stat-card">
        <div className="stat-title">Total Amount</div>
        <div className="stat-value">{formatCurrency(totalAmount)}</div>
        <div className="stat-sub">
          {totalRecords} SR{totalRecords === 1 ? "" : "s"}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-title">Total Discount</div>
        <div className="stat-value">{formatCurrency(totalDiscount)}</div>
        <div className="stat-sub">Approx. on this page</div>
      </div>
    </div>
  );
}

export default StatsCards;
