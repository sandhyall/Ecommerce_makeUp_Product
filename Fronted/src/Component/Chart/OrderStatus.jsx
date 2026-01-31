import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const OrdersChart = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [insight, setInsight] = useState(0);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = ["2024", "2025", "2026"];

  const generateData = () => {
    let dataLabels = [];
    let dataValues = [];

    if (timeframe === "day") {
      dataLabels = days;
      dataValues = days.map(() => Math.floor(Math.random() * 40));
    }

    if (timeframe === "month") {
      dataLabels = months;
      dataValues = months.map(() => Math.floor(Math.random() * 400));
    }

    if (timeframe === "year") {
      dataLabels = years;
      dataValues = years.map(() => Math.floor(Math.random() * 4000));
    }

    const last = dataValues[dataValues.length - 1];
    const prev = dataValues[dataValues.length - 2] || last;
    const percent = (((last - prev) / prev) * 100).toFixed(1);

    setLabels(dataLabels);
    setValues(dataValues);
    setInsight(percent);
  };

  useEffect(() => {
    generateData();
  }, [timeframe]);

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: labels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Orders",
        type: "bar",
        data: values,
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
              insight >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {insight >= 0 ? "▲" : "▼"} {Math.abs(insight)}% from previous period
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

      <ReactECharts option={option}  />
    </div>
  );
};

export default OrdersChart;
