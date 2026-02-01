const AddProduct = require("../../model/addproduct");
const Order = require("../../model/ordermodel");
const User = require("../../model/usermodel");


const GetSalesOrder = async (req, res) => {
  const { type = "month" } = req.query; 
  try {
    const data = [];
    const now = new Date();

    
    const aggregateData = async (start, end) => {
      const result = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end } } },
        { $unwind: "$items" },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalPrice" },
            soldQty: { $sum: "$items.quantity" }
          }
        }
      ]);
      return {
        revenue: result[0]?.revenue || 0,
        soldQty: result[0]?.soldQty || 0
      };
    };

    
    if (type === "day") {
      for (let i = 6; i >= 0; i--) {
        const base = new Date(now);
        base.setDate(base.getDate() - i);

        const start = new Date(base);
        start.setHours(0, 0, 0, 0);

        const end = new Date(base);
        end.setHours(23, 59, 59, 999);

        const { revenue, soldQty } = await aggregateData(start, end);

        data.push({
          label: start.toLocaleDateString("en-US", { weekday: "short" }),
          revenue,
          soldQty
        });
      }
    }

    
    if (type === "month") {
      for (let i = 11; i >= 0; i--) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1, 0, 0, 0);
        const end = new Date(
          now.getFullYear(),
          now.getMonth() - i + 1,
          0,
          23,
          59,
          59,
          999
        );

        const { revenue, soldQty } = await aggregateData(start, end);

        data.push({
          label: start.toLocaleDateString("en-US", { month: "short" }),
          revenue,
          soldQty
        });
      }
    }

   
    if (type === "year") {
      const currentYear = now.getFullYear();

      for (let i = 4; i >= 0; i--) {
        const year = currentYear - i;

        const start = new Date(year, 0, 1, 0, 0, 0);
        const end = new Date(year, 11, 31, 23, 59, 59, 999);

        const { revenue, soldQty } = await aggregateData(start, end);

        data.push({
          label: year.toString(),
          revenue,
          soldQty
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
      CancelOrder: cancel
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const GetTopProduct = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "addproducts",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" }
    ]);

    res.json(
      topProducts.map((p) => ({
        name: p.product.name,
        value: p.totalSold
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const TotalCustomer = async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.json({ totalCustomers: total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const TotalProduct = async (req, res) => {
  try {
    const total = await AddProduct.countDocuments();
    res.json({ totalProducts: total }); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  GetSalesOrder,
  GetOrderOverview,
  GetTopProduct,
  TotalCustomer,
  TotalProduct
};
