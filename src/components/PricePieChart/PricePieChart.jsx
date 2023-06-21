import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./PricePieChart.scss";

const PricePieChart = ({ price, budget }) => {
  const DATA = [
    { name: "Đã tiêu", value: price },
    { name: "Còn lại", value: budget - price },
  ];
  const COLORS = ["#0088FE", "#00C49F"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={12}
        fontWeight={600}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value === 0
          ? ""
          : value.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
      </text>
    );
  };
  return (
    <div>
      <div className="flex">
        <div className="colorInfor-1"></div>
        <h2>: Đã tiêu</h2>
      </div>
      <div style={{ marginBottom: "2rem" }} className="flex">
        <div className="colorInfor-2"></div>
        <h2>: Còn lại</h2>
      </div>

      <PieChart width={300} height={300}>
        <Pie
          data={DATA}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          fontSize={20}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {DATA.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <h1 style={{ marginTop: "2rem" }}>
        Ngân sách :{" "}
        {budget.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </h1>
    </div>
  );
};

export default PricePieChart;
