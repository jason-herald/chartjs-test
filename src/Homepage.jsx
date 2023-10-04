import React from "react";
import GraphComponent from "./GraphComponent";
import ScatterChartWithZoom from "./ScatterChartWithZoom";
import VictoryScatterChart from "./ScatterChartVictory";
import ReScatterChart from "./ScatterChartRecharts";
import ScatterPlotd3 from "./Scatterd3";
const HomePage = () => {
  return (
    <div>
      <h1>Charts using different Libraries</h1>
      <GraphComponent
        title={"Chart.js with plugin-zoom"}
        graph={<ScatterChartWithZoom />}
        achieved={["Zoom"]}
        notAchieved={[
          "Quadrants",
          "Quadrants shade",
          "Clickable links on tooltip",
        ]}
      />
      <GraphComponent
        title={"Victory Chart"}
        graph={<VictoryScatterChart />}
        achieved={[]}
        notAchieved={[
          "Quadrants",
          "Clickable links in tooltip",
          "Zoom",
          "Quadrants Shade",
        ]}
      />
      <GraphComponent
        title={"Recharts"}
        graph={<ReScatterChart />}
        achieved={["Quadrants", "Clickable links in tooltip"]}
        notAchieved={["Quadrants shade", "Zoom"]}
      />
      <GraphComponent
        title={"D3"}
        graph={<ScatterPlotd3 />}
        achieved={[
          "Clickable links in tooltip",
          "Quadrants",
          "Zoom - partially",
          "Quadrants shade",
        ]}
        notAchieved={[]}
      />
      {/* <ScatterPlotd3 /> */}
    </div>
  );
};

export default HomePage;
