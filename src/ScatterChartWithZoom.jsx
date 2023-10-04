import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-zoom";
import "chartjs-plugin-annotation";

function ScatterChartWithZoom() {
  const chartRef = useRef(null);

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "white";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";

      const table = document.createElement("table");
      table.style.margin = "0px";

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement("span");
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = "2px";
        span.style.marginRight = "10px";
        span.style.height = "10px";
        span.style.width = "10px";
        span.style.display = "inline-block";

        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;

        const text = document.createTextNode(body);

        const link = document.createElement("a");
        link.href = tooltip.dataPoints[i].parsed.link;
        link.target = "_blank";
        link.textContent = "Open Link";
        link.style.cursor = "pointer";

        link.addEventListener("click", (e) => {
          e.stopPropagation();
        });

        link.addEventListener("mouseover", () => {
          link.style.textDecoration = "underline";
        });

        link.addEventListener("mouseout", () => {
          link.style.textDecoration = "none";
        });

        td.appendChild(span);
        td.appendChild(text);
        td.appendChild(link);

        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
    tooltipEl.style.pointerEvents = "auto";
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Scatter Dataset",
              data: [
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
              ],
              backgroundColor: "orange",
              borderColor: "orange",
              borderWidth: 1,
              pointRadius: 7,
              pointHoverRadius: 10,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              min: 2000000,
              max: 12000000,
              title: {
                display: true,
                text: "Invoice Savings",
              },
              ticks: {
                callback: function (value) {
                  return `$${(value / 1000000).toFixed(2)}M`;
                },
              },
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.7)", // Adjust the color as needed
                lineWidth: 2,
                drawOnChartArea: false,
                borderDash: [5, 5], // This sets the dashed line pattern
              },
            },
            y: {
              min: 0,
              max: 120,
              title: {
                display: true,
                text: "Client Payment",
              },
              ticks: {
                callback: function (value) {
                  return `$${value}`;
                },
              },
              grid: {
                display: true,
                color: "rgba(0, 0, 0, 0.7)", // Adjust the color as needed
                lineWidth: 2,
                drawOnChartArea: false,
                borderDash: [5, 5], // This sets the dashed line pattern
              },
            },
          },
          plugins: {
            annotation: {
              drawTime: "beforeDraw",
              annotations: [
                {
                  type: "line",
                  yMin: 60,
                  yMax: 60,
                  borderColor: "rgb(255, 99, 132)",
                  borderWidth: 2,
                },
                {
                  type: "line",
                  mode: "vertical",
                  scaleID: "x",
                  value: 7000000,
                  borderColor: "green",
                  borderWidth: 2,
                  borderDash: [5, 5],
                },
              ],
            },
            zoom: {
              pan: {
                enabled: true,
                mode: "xy",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "xy",
              },
            },
            tooltip: {
              events: ["click"],
              callbacks: {
                label: function (context) {
                  const point = context.raw;
                  return `Category: ${point.category} | Link: ${point.link}`;
                },
              },
              position: "nearest",
              enabled: false,
              external: externalTooltipHandler,
            },
          },
          onBeforeDraw: (chart) => {
            const ctx = chart.ctx;
            const xAxis = chart.scales.x;
            const yAxis = chart.scales.y;

            ctx.clearRect(0, 0, chart.width, chart.height);

            const centerY = yAxis.getPixelForValue((yAxis.max + yAxis.min) / 2);
            ctx.strokeStyle = "rgba(255, 0, 0, 1)";
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(xAxis.left, centerY);
            ctx.lineTo(xAxis.right, centerY);
            ctx.stroke();

            const centerX = xAxis.getPixelForValue((xAxis.max + xAxis.min) / 2);
            ctx.strokeStyle = "rgba(255, 0, 0, 1)";
            ctx.beginPath();
            ctx.moveTo(centerX, yAxis.top);
            ctx.lineTo(centerX, yAxis.bottom);
            ctx.stroke();
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return <canvas ref={chartRef} />;
}

export default ScatterChartWithZoom;
