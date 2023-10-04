import React, { useEffect } from "react";
import * as d3 from "d3";

const ScatterPlotd3 = () => {
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

  const width = 800;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  const xMax = d3.max(data, (d) => d.x) * 1.1;
  const yMax = 120;

  const xScale = d3
    .scaleLinear()
    .domain([0, xMax])
    .range([margin.left, width - margin.right]);
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  useEffect(() => {
    const svg = d3.select("#scatter-plot");

    const g = svg.append("g"); // Create a group for zoomable elements
    const axisGroup = svg.append("g"); // Create a group for static axes

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .on("click", function (event, d) {
        if (d.link) {
          window.open(d.link, "_blank");
        }
      });

    const zoomBehavior = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);

    g.call(zoomBehavior);

    function zoomed(event) {
      const transform = event.transform;

      g.attr("transform", transform); // Apply the zoom transform to the group

      tooltip.style("visibility", "hidden"); // Hide the tooltip during zoom
      updateAxes(transform);
    }

    function updateAxes(transform) {
      axisGroup
        .select(".x-axis")
        .call(d3.axisBottom(transform.rescaleX(xScale)));
      axisGroup.select(".y-axis").call(d3.axisLeft(transform.rescaleY(yScale)));
    }

    axisGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => `$${d / 1000000}M`));

    axisGroup
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickValues([0, 20, 40, 60, 80, 100, 120]));

    g.append("rect")
      .attr("x", xScale(6000000))
      .attr("y", margin.top)
      .attr("width", xScale(6000000) - margin.left)
      .attr("height", yScale(60) - margin.top)
      .attr("fill", "grey")
      .attr("opacity", 0.2)
      .style("pointer-events", "none");

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "#ED6E0C");

    g.append("line")
      .attr("x1", xScale(6000000))
      .attr("y1", margin.top)
      .attr("x2", xScale(6000000))
      .attr("y2", height - margin.bottom)
      .attr("stroke", "black");

    g.append("line")
      .attr("x1", margin.left)
      .attr("y1", yScale(60))
      .attr("x2", width - margin.right)
      .attr("y2", yScale(60))
      .attr("stroke", "black");

    g.selectAll("circle")
      .on("click", (event, d) => {
        tooltip
          .html(
            `Category: ${d.category}<br/>
           <a href="${d.link}" target="_blank" rel="noopener noreferrer">View</a>`
          )
          .style("visibility", "visible");

        const [x, y] = d3.pointer(event);
        tooltip.style("top", y - 10 + "px").style("left", x + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    return () => {
      svg.selectAll("*").remove(); // This will remove all elements within the SVG
      d3.select("#tooltip").remove(); // This removes the tooltip div from the body
      d3.select(document).on("click", null); // This removes the global click event listener
    };
  }, []);

  return <svg id="scatter-plot" width={width} height={height} />;
};

export default ScatterPlotd3;
