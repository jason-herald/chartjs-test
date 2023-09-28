import "./App.css";
import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import ScatterChartWithZoom from "./ScatterChartWithZoom";

function App() {
  Chart.register(zoomPlugin);
  return (
    <div className="App">
      <h2>Scatter Chart with Zoom using Chart.js</h2>
      <ScatterChartWithZoom />
    </div>
  );
}

export default App;
