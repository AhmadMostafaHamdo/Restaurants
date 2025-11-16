// controllers/sales.js
const Sale = require("../model/Sale");

// ✅ موجود سابقاً
exports.createSale = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const sale = new Sale({
      userId,
      items,
      totalAmount,
    });

    await sale.save();

    res.status(201).json({ message: "Sale recorded successfully", sale });
  } catch (error) {
    res.status(500).json({ message: "Error recording sale", error });
  }
};

// ✅ جديد: جلب كل المبيعات حسب userId
exports.getUserSales = async (req, res) => {
  try {
    const { userId } = req.params;

    const sales = await Sale.find({ userId }).populate(
      "items.productId",
      "name price image"
    );

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales", error });
  }
};
