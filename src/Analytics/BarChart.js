import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './BarChart.css'

function BarChart() {
    const [data, setData] = useState([]);
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const margin ={top: 42, right: 73, bottom: 67, left: 108 };
        const width = 600 ;
        const height = 366;

        const x = d3.scaleBand()
            .domain(data.map(d => d.activityName))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averageRating)]).nice()
            .range([height - margin.bottom, margin.top]);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.activityName))
            .range(["#B5179E", "#F72585", "#7209B7", "#D2D2D2", "#46236E", "#3A0CA3"]);

        svg.append("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.activityName))
            .attr("y", d => y(d.averageRating))
            .attr("height", d => y(0) - y(d.averageRating))
            .attr("width", x.bandwidth())
            .attr("fill", d => color(d.activityName))
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 0.6);
                
                const [x, y] = d3.pointer(event, svg.node()); // Get pointer relative to SVG
            
                d3.select(tooltipRef.current)
                    .style("visibility", "visible")
                    .text(d.activityName + ": " + d.averageRating)
                    .style("top", (y - 30) + "px")
                    .style("left", (x + 15) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("opacity", 1);

                d3.select(tooltipRef.current).style("visibility", "hidden");
            });

        // Adding the y-axis with specified styling properties
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", width-535)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "14px")         // Set font size
            .style("fill", "#000")              // Set font color
            .style("font-style", "normal")      // Set font style
            .style("font-weight", "500")        // Set font weight
            .style("line-height", "normal")     // Set line height
            .style("font-family", "Familjen Grotesk")  // Set font family
            .text("Average Rating (Stars)");

        // Add Heading with specified styling properties
        svg.append("text")
            .attr("x", 600 / 2)                  // center the text
            .attr("y", margin.top / 2)           // position at half of the top margin
            .attr("text-anchor", "middle")       // anchor the text at its middle
            .style("font-size", "16px")          // Set font size
            .style("fill", "#000")               // Set font color
            .style("font-style", "normal")       // Set font style
            .style("font-weight", "500")         // Set font weight
            .style("line-height", "27.5px")      // Set line height
            .style("font-family", "Familjen Grotesk") // Set font family
            .style("letter-spacing", "-0.32px")  // Set letter spacing
            .text("Average Rating per Topic");

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSize(0))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .attr("dy", "0.35em")
            .attr("dx", "-0.75em")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickSize(0));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickSize(0))


    }, [data]);

    return (
        <div className='outer-container-bargraph'>
            <div ref={tooltipRef} className="tooltip" style={{ position: "absolute", visibility: "hidden", background: "#eee", padding: "5px", borderRadius: "5px" }}></div>
            <svg ref={svgRef} width={600} height={400}></svg>
        </div>
    );
}

export default BarChart;
