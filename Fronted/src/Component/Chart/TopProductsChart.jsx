import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const ServerUrles = import.meta.env.VITE_SERVER; 

const TopProductsChart = () => {
  const [products, setProducts] = useState([]);
  const [insight, setInsight] = useState("");

  const fetchTopProducts = async () => {
    try {
      const res = await axios.get(`${ServerUrles}/chart/top`);
      const data = res.data;

      setProducts(data);
      if (data.length > 0) setInsight(`${data[0].name} is best seller`);
    } catch (err) {
      console.error("Error fetching top products:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTopProducts();
  }, []);

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "value" },
    yAxis: {
      type: "category",
      data: products.map((p) => p.name),
    },
    series: [
      {
        name: "Sold Quantity",
        type: "bar",
        data: products.map((p) => p.value),
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-semibold">Top Products</h2>
          <p className="text-sm text-teal-600 font-medium">🏆 {insight}</p>
        </div>
      </div>

      <ReactECharts option={option} />
    </div>
  );
};

export default TopProductsChart;
