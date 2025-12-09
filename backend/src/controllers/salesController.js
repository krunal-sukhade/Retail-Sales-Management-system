const salesService = require("../services/salesService");

exports.getSales = async (req, res) => {
  try {
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
    } = req.query;

    const query = {
      search: search || "",
      region: region || "",
      gender: gender || "",
      ageMin: ageMin ? Number(ageMin) : null,
      ageMax: ageMax ? Number(ageMax) : null,
      productCategory: productCategory || "",
      tags: tags || "",
      paymentMethod: paymentMethod || "",
      dateFrom: dateFrom || "",
      dateTo: dateTo || "",
      sortBy: sortBy || "date",
      sortOrder: sortOrder || "desc",
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10
    };

    // 🌟 Mongo service returns a Promise → await it
    const result = await salesService.getSales(query);

    res.json(result);
  } catch (err) {
    console.error("Error in getSales controller:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
