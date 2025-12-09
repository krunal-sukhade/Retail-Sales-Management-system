const Sale = require("../models/Sale");
const { parseList } = require("../utils/queryParser");

function normalizeRecord(r) {
  return {
    transactionId: r["Transaction ID"],
    date: r["Date"] instanceof Date ? r["Date"].toISOString().slice(0,10) : "",

    customerId: r["Customer ID"] || "",
    customerName: r["Customer Name"] || "",

    phoneNumber:
      typeof r["Phone Number"] === "object"
        ? r["Phone Number"].$numberLong
        : String(r["Phone Number"] || ""),

    gender: r["Gender"] || "",
    age: r["Age"] || "",

    customerRegion: r["Customer Region"] || "",
    productId: r["Product ID"] || "",
    productName: r["Product Name"] || "",
    productCategory: r["Product Category"] || "",
    
    quantity: r["Quantity"] || 0,
    pricePerUnit: r["Price per Unit"] || 0,
    discount: r["Discount Percentage"] || 0,
    
    totalAmount: r["Total Amount"] || 0,
    finalAmount: r["Final Amount"] || 0,

    paymentMethod: r["Payment Method"] || "",
    tags:
      typeof r["Tags"] === "string"
        ? r["Tags"].split(",").map((t) => t.trim())
        : [],

    employeeName: r["Employee Name"] || "",
  };
}

exports.getSales = async (query) => {
  let {
    search = "",
    region = "",
    gender = "",
    ageMin,
    ageMax,
    productCategory = "",
    tags = "",
    paymentMethod = "",
    dateFrom = "",
    dateTo = "",
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filter = {};

  // 🔍 SEARCH
  if (search) {
    const searchRegex = new RegExp(search, "i");
    filter.$or = [
      { "Customer Name": searchRegex },
      { "Phone Number": searchRegex }
    ];
  }

  // 🌍 REGION
  const regions = parseList(region).map(x => x.toLowerCase());
  if (regions.length) {
    filter["Customer Region"] = {
      $in: regions.map(r => new RegExp("^" + r + "$", "i"))
    };
  }

  // 👤 GENDER
  const genders = parseList(gender).map(x => x.toLowerCase());
  if (genders.length) {
    filter["Gender"] = {
      $in: genders.map(g => new RegExp("^" + g + "$", "i"))
    };
  }

  // 🎂 AGE RANGE
  if (ageMin || ageMax) {
    filter["Age"] = {};
    if (ageMin) filter["Age"].$gte = Number(ageMin);
    if (ageMax) filter["Age"].$lte = Number(ageMax);
  }

  // 🛍 CATEGORY (partial)
  const categories = parseList(productCategory).map(x => x.toLowerCase());
  if (categories.length) {
    filter["Product Category"] = {
      $in: categories.map(c => new RegExp(c, "i"))
    };
  }

  // 🏷 TAGS
  const tagList = parseList(tags).map(t => t.toLowerCase());
  if (tagList.length) {
    filter["Tags"] = {
      $in: tagList.map(t => new RegExp(t, "i"))
    };
  }

  // 💳 PAYMENT METHOD
  const methods = parseList(paymentMethod).map(x => x.toLowerCase());
  if (methods.length) {
    filter["Payment Method"] = {
      $in: methods.map(m => new RegExp("^" + m + "$", "i"))
    };
  }

  // 📅 DATE RANGE
  if (dateFrom || dateTo) {
    filter["Date"] = {};
    if (dateFrom) filter["Date"].$gte = new Date(dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      filter["Date"].$lte = end;
    }
  }

  // 🔽 Sorting
  const sort = {};
  const dir = sortOrder === "asc" ? 1 : -1;

  if (sortBy === "customerName") {
    sort["Customer Name"] = dir;
  } else if (sortBy === "quantity") {
    sort["Quantity"] = dir;
  } else {
    sort["Date"] = dir;
  }

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const pageSize = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * pageSize;

  const [totalItems, docs] = await Promise.all([
    Sale.countDocuments(filter),
    Sale.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
  ]);

  const data = docs.map(normalizeRecord);

  return {
    data,
    pagination: {
      totalItems,
      totalPages: Math.max(Math.ceil(totalItems / pageSize), 1),
      currentPage: pageNum,
      pageSize,
    },
  };
};
