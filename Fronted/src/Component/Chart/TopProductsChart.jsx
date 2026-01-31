import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const TopProductsChart = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [products, setProducts] = useState([]);
  const [insight, setInsight] = useState("");

  const productNames = [
    "Lipstick",
    "Foundation",
    "Mascara",
    "Eyeliner",
    "Face Cream",
  ];

  const generateData = () => {
    const data = productNames.map((name) => ({
      name,
      value: Math.floor(Math.random() * 200) + 20,
    }));

    const sorted = data.sort((a, b) => b.value - a.value);

    setProducts(sorted);

    setInsight(`${sorted[0].name} is best seller`);
  };

  useEffect(() => {
    generateData();
  }, [timeframe]);

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

        <div className="flex gap-2">
          {["day", "month", "year"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded text-sm ${
                timeframe === t
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <ReactECharts option={option}  />
    </div>
  );
};

export default TopProductsChart;
