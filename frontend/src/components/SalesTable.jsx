import React from "react";
import { useState } from "react";

function formatAmount(amount) {
  if (!amount) return "₹0";
  return "₹" + Number(amount).toLocaleString("en-IN");
}


function PhoneCell({ number }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="phone-cell">
      {number}
      <button className="copy-btn" onClick={copy}>
        📋
      </button>
      {copied && <span className="copied-tooltip">Copied!</span>}
    </div>
  );
}


function SalesTable({ records }) {
  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row, idx) => (
            <tr key={row.transactionId || row.id || `${row.customerId}-${idx}`}>
              <td>{row.transactionId}</td>
              <td>{row.date}</td>
              <td>{row.customerId}</td>
              <td>{row.customerName}</td>
              <td><PhoneCell number={row.phoneNumber} /></td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.productCategory}</td>
              <td>{String(row.quantity).padStart(2, "0")}</td>
              <td>{formatAmount(row.totalAmount)}</td>
              <td>{row.customerRegion}</td>
              <td>{row.productId}</td>
              <td>{row.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
