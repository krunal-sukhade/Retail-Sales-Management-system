const path = require("path");
const fs = require("fs");
const { applyPagination } = require("../utils/pagination");
const {
  parseList,
  normalizeString,
  parseDateSafe
} = require("../utils/queryParser");

const dataPath = path.join(__dirname, "..", "data", "salesData.json");

// Load dataset once at startup
let salesData = [];

try {
  const raw = fs.readFileSync(dataPath, "utf-8");
  salesData = JSON.parse(raw);
  console.log(`Loaded ${salesData.length} sales records.`);
} catch (err) {
  console.error("Failed to load salesData.json:", err.message);
  salesData = [];
}

function matchesSearch(record, searchTerm) {
  if (!searchTerm) return true;
  const s = normalizeString(searchTerm);
  const name = normalizeString(record.customerName || "");
  const phone = normalizeString(record.phoneNumber || "");
  return name.includes(s) || phone.includes(s);
}

function matchesRegion(record, regionQuery) {
  if (!regionQuery) return true;
  const regions = parseList(regionQuery); // array of strings
  if (!regions.length) return true;
  const recordRegion = normalizeString(record.customerRegion || "");
  return regions.some((r) => recordRegion === r);
}

function matchesGender(record, genderQuery) {
  if (!genderQuery) return true;
  const genders = parseList(genderQuery);
  if (!genders.length) return true;
  const g = normalizeString(record.gender || "");
  return genders.some((x) => g === x);
}

function matchesAge(record, ageMin, ageMax) {
  if (ageMin == null && ageMax == null) return true;
  const age = Number(record.age);
  if (Number.isNaN(age)) return false;

  let min = ageMin;
  let max = ageMax;

  // Handle invalid numeric range: swap if min > max
  if (min != null && max != null && min > max) {
    const temp = min;
    min = max;
    max = temp;
  }

  if (min != null && age < min) return false;
  if (max != null && age > max) return false;
  return true;
}

function matchesProductCategory(record, categoryQuery) {
  if (!categoryQuery) return true;
  const categories = parseList(categoryQuery);
  if (!categories.length) return true;
  const cat = normalizeString(record.productCategory || "");
  return categories.some((c) => cat.includes(c));
}

function getRecordTags(record) {
  if (!record.tags) return [];
  if (Array.isArray(record.tags)) {
    return record.tags.map(normalizeString).filter(Boolean);
  }
  if (typeof record.tags === "string") {
    return record.tags
      .split(",")
      .map(normalizeString)
      .filter(Boolean);
  }
  return [];
}

// function matchesTags(record, tagsQuery) {
//   if (!tagsQuery) return true;
//   const queryTags = parseList(tagsQuery);
//   if (!queryTags.length) return true;

//   const recordTags = getRecordTags(record);
//   if (!recordTags.length) return false;

//   // ANY matching tag
//   return queryTags.some((tag) => recordTags.includes(tag));
// }

function matchesTags(record, tagsQuery) {
  if (!tagsQuery) return true;

  const queryTags = parseList(tagsQuery).map(normalizeString);
  if (!queryTags.length) return true;

  const recordTags = getRecordTags(record); // already normalized
  if (!recordTags.length) return false;

  // Adaptive partial match
  return queryTags.some((q) =>
    recordTags.some((t) => t.includes(q))
  );
}


function matchesPaymentMethod(record, payQuery) {
  if (!payQuery) return true;
  const methods = parseList(payQuery);
  if (!methods.length) return true;
  const m = normalizeString(record.paymentMethod || "");
  return methods.some((x) => m === x);
}

function matchesDateRange(record, dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return true;

  const d = parseDateSafe(record.date);
  if (!d) return false;

  const from = dateFrom ? parseDateSafe(dateFrom) : null;
  const to = dateTo ? parseDateSafe(dateTo) : null;

  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

function sortRecords(records, sortBy, sortOrder) {
  const order = sortOrder === "asc" ? 1 : -1;

  return records.sort((a, b) => {
    if (sortBy === "date") {
      const da = parseDateSafe(a.date);
      const db = parseDateSafe(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return (da - db) * order;
    }

    if (sortBy === "quantity") {
      const qa = Number(a.quantity) || 0;
      const qb = Number(b.quantity) || 0;
      if (qa === qb) return 0;
      return qa > qb ? order : -order;
    }

    if (sortBy === "customerName") {
      const na = normalizeString(a.customerName || "");
      const nb = normalizeString(b.customerName || "");
      if (na === nb) return 0;
      return na > nb ? order : -order;
    }

    // default: no extra sorting
    return 0;
  });
}

function getSales(query) {
  const {
    search,
    region,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
    page,
    limit
  } = query;

  // 1. Filter
  let filtered = salesData.filter((record) => {
    return (
      matchesSearch(record, search) &&
      matchesRegion(record, region) &&
      matchesGender(record, gender) &&
      matchesAge(record, ageMin, ageMax) &&
      matchesProductCategory(record, productCategory) &&
      matchesTags(record, tags) &&
      matchesPaymentMethod(record, paymentMethod) &&
      matchesDateRange(record, dateFrom, dateTo)
    );
  });

  // 2. Sort
  filtered = sortRecords(filtered, sortBy, sortOrder);

  // 3. Pagination
  const { items, totalItems, totalPages, currentPage, pageSize } =
    applyPagination(filtered, page, limit);

  return {
    data: items,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      pageSize
    }
  };
}

module.exports = {
  getSales
};
