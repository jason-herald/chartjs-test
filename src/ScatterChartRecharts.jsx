import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  
} from "recharts";

const data = [
  {
    x: 2500000,
    y: 10,
    category: "Appetizer - Mexican",
    link: "https://google.com",
  },
  {
    x: 4000000,
    y: 30,
    category: "Main Course - Italian",
    link: "https://youtube.com",
  },
  {
    x: 5500000,
    y: 50,
    category: "Dessert - French",
    link: "http://example3.com",
  },
  {
    x: 8000000,
    y: 80,
    category: "Appetizer - Chinese",
    link: "http://example4.com",
  },
  {
    x: 11000000,
    y: 100,
    category: "Main Course - Indian",
    link: "http://example5.com",
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, link } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",

          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: "#43364C" }}>
          Category:
        </p>
        <p style={{ margin: 0, color: "#43364C" }}>{category}</p>
        <p style={{ margin: 0 }}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ED6E0C" }}
          >
            Update Dashboard
          </a>
        </p>
      </div>
    );
  }
  return null;
};

const ReScatterChart = () => {
  const xAxisQuadrantValue = 6000000; // Change this to your desired X axis quadrant value
  const yAxisQuadrantValue = 60;
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        width={400}
        height={300}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Invoice Savings"
          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          domain={[0, 1200000]}
          ticks={[0, 2000000, 4000000, 6000000, 8000000, 10000000, 12000000]}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Client Payment"
          tickFormatter={(value) => `$${value.toFixed(1)}`}
          domain={[0, 120]}
          ticks={[0, 20, 40, 60, 80, 100, 120]}
        />
        <Tooltip
          trigger="click"
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: "3 3" }}
          wrapperStyle={{ pointerEvents: "auto" }}
        />

        {/* Adding ReferenceLines for X and Y axis to create quadrants */}
        <ReferenceLine x={xAxisQuadrantValue} stroke="black" strokeWidth={1} />
        <ReferenceLine y={yAxisQuadrantValue} stroke="black" strokeWidth={1} />

        <Scatter data={data} fill="#ED6E0C" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ReScatterChart;
