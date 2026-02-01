import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const ServerUrles = import.meta.env.VITE_SERVER; 

const OrdersChart = () => {
  const [timeframe, setTimeframe] = useState("month"); 
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [growth, setGrowth] = useState(0);

  
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${ServerUrles}/chart/sold?type=${timeframe}`);
      const data = Array.isArray(res.data) ? res.data : [];

      
      const dataLabels = data.map((d) => d.label);
      const dataValues = data.map((d) => d.soldQty || 0);

     
      const last = dataValues[dataValues.length - 1] || 0;
      const prev = dataValues[dataValues.length - 2] || last || 1; 
      const percent = (((last - prev) / prev) * 100).toFixed(1);

      setLabels(dataLabels);
      setValues(dataValues);
      setGrowth(percent);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setLabels([]);
      setValues([]);
      setGrowth(0);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, [timeframe]);

  
  const option = {
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: labels },
    yAxis: { type: "value" },
    series: [
      {
        name: "Orders",
        type: "bar",
        data: values,
        itemStyle: {
          color: "#14B8A6", 
        },
      },
    ],
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-xl font-semibold">Orders Overview</h2>
          <p
            className={`text-sm font-medium ${
              growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {growth >= 0 ? "▲" : "▼"} {Math.abs(growth)}% from previous period
          </p>
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

      <ReactECharts option={option} />
    </div>
  );
};

export default OrdersChart;
