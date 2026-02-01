import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const ServerUrles = import.meta.env.VITE_SERVER; 

const SalesChart = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [labels, setLabels] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [soldQty, setSoldQty] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${ServerUrles}/chart/sold?type=${timeframe}`);
      const data = res.data;

      setLabels(data.map(d => d.label));
      setRevenue(data.map(d => d.revenue));
      setSoldQty(data.map(d => d.soldQty));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [timeframe]);

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: ["Revenue", "Sold Quantity"] },
    xAxis: { type: "category", data: labels },
    yAxis: [
      { type: "value", name: "Revenue", position: "left" },
      { type: "value", name: "Sold Qty", position: "right" }
    ],
    series: [
      { name: "Revenue", type: "line", smooth: true, data: revenue },
      { name: "Sold Quantity", type: "bar", yAxisIndex: 1, data: soldQty }
    ]
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Sales Overview</h2>
        <div className="flex gap-2">
          {["day","month","year"].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded text-sm ${timeframe===t ? "bg-teal-500 text-white":"bg-gray-200 text-gray-700"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <ReactECharts option={option} />
    </div>
  );
};

export default SalesChart;
