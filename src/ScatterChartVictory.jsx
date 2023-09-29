import React, { useState } from "react";
import {
  VictoryScatter,
  VictoryChart,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";

const data = [
  {
    x: 2500000,
    y: 10,
    category: "Appetizer - Mexican",
    link: "http://example1.com",
  },
  {
    x: 4000000,
    y: 30,
    category: "Main Course - Italian",
    link: "http://example2.com",
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

const CustomTooltip = ({ datum }) => {
  if (!datum) return null; // Return early if datum is undefined
  const { category, link } = datum;
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#fff",
      }}
    >
      {category}
      <br />
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </div>
  );
};

const VictoryScatterChart = () => {
  return (
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer
          voronoiDimension="x"
          labels={({ datum }) => `${datum.category}\n${datum.link}`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
              renderInPortal={false}
              active
              flyoutComponent={<CustomTooltip />}
            />
          }
        />
      }
    >
      <VictoryScatter data={data} />
    </VictoryChart>
  );
};

export default VictoryScatterChart;
