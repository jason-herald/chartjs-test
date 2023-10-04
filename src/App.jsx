import "./App.css";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import ScatterChartWithZoom from "./ScatterChartWithZoom";
import ReScatterChart from "./ScatterChartRecharts";
import VictoryScatterChart from "./ScatterChartVictory";
import ScatterPlotd3 from "./Scatterd3";
import HomePage from "./Homepage";

function App() {
  Chart.register(zoomPlugin);
  return (
    <div className="App">
      <h2>Scatter Chart with d3</h2>
      {/* <ScatterChartWithZoom /> */}
      {/* <ReScatterChart /> */}
      {/* <VictoryScatterChart /> */}
      {/* <ScatterPlotd3 /> */}
      <HomePage />
    </div>
  );
}

export default App;
