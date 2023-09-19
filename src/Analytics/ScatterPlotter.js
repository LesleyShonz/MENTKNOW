import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './BarChart.css';

/**
 * ScatterPlot is a component that fetches data from an API and displays
 * a scatter plot with average ratings on the y-axis and number of contributions
 * on the x-axis. It uses D3.js for data visualization.
 */
function ScatterPlot() {
    // State for holding the fetched data
    const [data, setData] = useState([]);
    // Reference to the SVG element for D3 manipulation
    const svgRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    /**
     * useEffect hook to fetch data from the API when the component mounts.
     */
    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(fetchedData => {
                setData(fetchedData.map(d => ({
                    avgRating: parseFloat(d.averageRating.toFixed(2)),
                    contributions: d.numContributions, // assuming numContributions is an integer, not rounding it
                    activityName: d.activityName
                })));
                setIsLoading(false);
            });
    }, []);
    
    

    /**
     * useEffect hook to draw the scatter plot whenever the data changes.
     */
    useEffect(() => {
        // Do nothing if data is not loaded yet
        if (!data || data.length === 0) return;

        // Clear previous SVG contents
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = 450 - margin.left - margin.right;
        const height = 300

        // X scale - maps number of contributions to horizontal position
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.contributions)])
            .range([margin.left, width - margin.right]);

        // Y scale - maps average rating to vertical position
        const y = d3.scaleLinear()
            .domain([0, 5])
            .range([height - margin.bottom, margin.top]);

        // Color scale - maps activity names to distinct colors
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.activityName))
            .range(["#B5179E", "#F72585", "#7209B7", "#D2D2D2", "#46236E", "#3A0CA3"]);

        // Tooltip for displaying activity name on hover
        const tooltip = svg.append("text")
            .attr("font-size", "12px")
            .style("opacity", 0);

        // Drawing the circles for the scatter plot
        svg.append("g")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", d => x(d.contributions))
            .attr("cy", d => y(d.avgRating))
            .attr("r", 6)
            .attr("fill", d => color(d.activityName))
            .on("mouseover", (event, d) => {
                // Increase circle size and show tooltip on hover
                d3.select(event.currentTarget).transition().attr("r", 12);
                const posX = d3.pointer(event)[0];
                const posY = d3.pointer(event)[1];
                tooltip.attr("x", posX + 15)
                    .attr("y", posY)
                    .text(`${d.activityName} (${d.contributions}, ${d.avgRating})`) // Showing both name and coordinates
                    .style("opacity", 1);
            })
            .on("mouseout", (event) => {
                // Reset circle size and hide tooltip
                d3.select(event.currentTarget).transition().attr("r", 6);
                tooltip.style("opacity", 0);
            });

        // Drawing the x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(4).tickSize(0).tickSizeOuter(0))
            .selectAll("path")
            .attr("stroke", "none");
        // Drawing the y-axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(4).tickSize(0))
            .selectAll("path")
            .attr("stroke", "none");

        // Label for the x-axis
        svg.append("text")
            .attr("transform", `translate(${(width / 2 )+40},${height - margin.bottom + 40})`)
            .style("text-anchor", "middle")
            .text("Number of Contributions (Sticky Notes)")
            .attr("fill", "#000")
            .attr("font-family", "Familjen Grotesk")
            .attr("font-size", "14px")
            .attr("font-weight", "500");


        // Label for the y-axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.left - 45)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average Rating (Stars)")
            .attr("fill", "#000")
            .attr("font-family", "Familjen Grotesk")
            .attr("font-size", "14px")
            .attr("font-weight", "500");


    }, [data]);

    return (
        <div className="bottom-left-span">
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <div className="panel-mover">
                    <p className='scatter-plot-heading-style'>Topic Rating vs Number of Contributions</p>
                    <svg ref={svgRef} width={800} height={400}></svg>
                </div>
            )}
        </div>
    );  
}
export default ScatterPlot;
