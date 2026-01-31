const Order = require("../../model/ordermodel");

const GetSalesOrder = async (req, res) => {
  const { type = "month" } = req.query; // ✅ FIX

  try {
    const data = [];

    if (type === "day") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const start = new Date(date.setHours(0, 0, 0, 0));
        const end = new Date(date.setHours(23, 59, 59, 999));

        const total = await Order.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);

        data.push({
          label: start.toLocaleDateString("en-US", { weekday: "short" }),
          value: total[0]?.total || 0,
        });
      }
    }

    if (type === "month") {
      const today = new Date();

      for (let i = 11; i >= 0; i--) {
        const start = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const end = new Date(
          today.getFullYear(),
          today.getMonth() - i + 1,
          0,
          23, 
          59,
          59,
        );

        const total = await Order.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);

        data.push({
          label: start.toLocaleDateString("en-US", { month: "short" }),
          value: total[0]?.total || 0,
        });
      }
    }

    if (type === "year") {
      const currentYear = new Date().getFullYear();

      for (let i = 4; i >= 0; i--) {
        const year = currentYear - i;
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31, 23, 59, 59);

        const total = await Order.aggregate([
          { $match: { createdAt: { $gte: start, $lte: end } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } },
        ]);

        data.push({
          label: year.toString(),
          value: total[0]?.total || 0,
        });
      }
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetOrderOverview = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: "Pending" });
    const complete = await Order.countDocuments({ status: "Complete" });
    const cancel = await Order.countDocuments({ status: "Cancelled" });

    res.json({
      TotalOrder: total,
      PendingOrder: pending,
      CompleteOrder: complete,
      CancelOrder: cancel,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetTopProduct = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.name",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json(
      topProducts.map((p) => ({
        name: p._id,
        value: p.totalSold,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  GetSalesOrder,
  GetOrderOverview,
  GetTopProduct,
};
