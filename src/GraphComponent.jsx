import React from "react";

const GraphComponent = ({ title, graph, achieved, notAchieved }) => {
  return (
    <div>
      <h2>{title}</h2>
      {graph}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <div>
          <h3>Objectives Achieved</h3>
          <ul>
            {achieved.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Objectives Not Achieved</h3>
          <ul>
            {notAchieved.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
