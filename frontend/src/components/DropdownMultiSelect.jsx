import React, { useState, useRef, useEffect } from "react";


export default function DropdownMultiSelect({
  label,
  value,
  options,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const selected = value.split(",").filter(Boolean);

  const toggleOpen = () => setOpen((prev) => !prev);

  const toggleValue = (val) => {
    let updated = [];

    if (selected.includes(val)) {
      updated = selected.filter((v) => v !== val);
    } else {
      updated = [...selected, val];
    }

    onChange(updated.join(","));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>

      <div className="dropdown-box" onClick={toggleOpen}>
        <span className="dropdown-value">
          {selected.length ? selected.join(", ") : "All"}
        </span>
        <span className={`arrow-icon ${open ? "rotate" : ""}`}>▾</span>
      </div>

      {open && (
        <div className="dropdown-panel">
          {options.map((opt) => (
            <label key={opt.value} className="dropdown-option">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleValue(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
