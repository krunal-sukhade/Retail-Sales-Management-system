function parseList(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => x.toLowerCase());
}

function normalizeString(value) {
  return String(value || "").trim().toLowerCase();
}

function parseDateSafe(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  // Zero out time for predictable comparisons
  d.setHours(0, 0, 0, 0);
  return d;
}

module.exports = {
  parseList,
  normalizeString,
  parseDateSafe
};
