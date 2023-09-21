/**
 * PieChart Component.
 * 
 * Represents data in a pie chart visualization to give insights into activity performance,
 * particularly the proportion of contributions per activity topic. The component fetches data 
 * from an API upon mounting and presents the information in colored sections that are interactive 
 * and can be hovered over for detailed percentages.
 * 
 * Features:
 * - Data is fetched from an API upon component mount and processed.
 * - Utilizes D3.js for the pie chart visualization, including hover effects.
 * - Displays the percentage of contributions each activity topic holds in the total.
 * - Provides a legend to map colors to activity topics for better readability.
 * 
 * Expected API Data Format:
 * [
 *   { averageRating: float, numContributions: int, activityName: string },
 *   ... (more data objects)
 * ]
 * 
 * Props: None
 * 
 * Example:
 * <PieChart />
 * 
 * Dependencies: 
 * - D3.js
 * 
 * Note:
 * - CSS styling and positioning can be adjusted in the './BarChart.css' file even though 
 *   the name suggests BarChart, it's being used for styling this PieChart component.
 */

import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './BarChart.css';

function PieChart() {
    // State to hold fetched data
    const [data, setData] = useState([]);
    // Reference to our SVG element in the DOM
    const svgRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Fetches data from the specified API endpoint, processes it, and updates
     * the component's state. Specifically, it rounds off the 'averageRating' to 
     * two decimal places.
     */
    useEffect(() => {
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(data => {
                const roundedData = data.map(item => ({
                    ...item,
                    averageRating: parseFloat(item.averageRating.toFixed(2))
                }));
                setData(roundedData);
                setIsLoading(false);
            });
            
    }, []);
    
    /**
     * Draws or updates the pie chart visualization. It uses D3.js to create the chart.
     * The pie represents the number of contributions per activity topic. It also adds
     * hover effects to enlarge sections, displays percentage labels, and includes 
     * a color legend to improve readability.
     */
    useEffect(() => {
        // Exit if data is not yet available or empty
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Define the SVG canvas size
        const width = 560;
        const height = 312;

        // Define pie chart size and positioning
        const radius = 112;  // Size of the pie
        const pieCenterX = 160; // Horizontal position of the pie center
        const pieCenterY = 155; // Vertical position of the pie center

        // Adding the Pie Chart Heading
        svg.append("text")
            .attr("x", pieCenterX)
            .attr("y", pieCenterY - radius - 10) // Positioning the heading slightly above the pie
            .attr("text-anchor", "middle") // This will center the text at the given x position
            .style("fill", "#000")
            .style("font-family", "Familjen Grotesk")
            .style("font-size", "16px")
            .style("font-style", "normal")
            .style("font-weight", "500")
            .style("line-height", "27.5px")
            .style("letter-spacing", "-0.32px")
            .text("Number of contribution each topic"); // Replace "Pie Chart Title" with your desired title
        // Define the main arc (shape of the pie sections)
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Define the hover arc (shape when a section is hovered)
        const hoverArc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius + 10);

        // Compute the pie layout based on data
        const pie = d3.pie()
            .value(d => d.numContributions);

        // Create a color scale to determine section colors
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.activityName))
            .range(["#B5179E", "#F72585", "#7209B7", "#D2D2D2", "#46236E", "#3A0CA3"]);

        // Convert data into arc data
        const arcs = pie(data);
        const totalContributions = d3.sum(data, d => d.numContributions);

        // Generate pie sections in the SVG
        const sections = svg.append("g")
            .attr("transform", `translate(${pieCenterX}, ${pieCenterY})`) // This sets the center of the pie
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.activityName))
            .attr("d", arc)
            .on("mouseover", function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("d", hoverArc);
            })
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("d", arc);
            })
            .append("title")
            .text(d => `${((d.data.numContributions / totalContributions) * 100).toFixed(2)}%`);

        // Generate labels for the pie sections
        const labels = svg.append("g")
            .attr("transform", `translate(${pieCenterX}, ${pieCenterY})`) // This sets the position of labels relative to the pie center
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(d => d.data.numContributions !== 0 ? `${((d.data.numContributions / totalContributions) * 100).toFixed(2)}%` : '');


        labels.on("mouseover", function () {
            d3.select(this).style("font-size", "18px");
        })
            .on("mouseout", function () {
                d3.select(this).style("font-size", "16px");
            });

        // LEGEND SETTINGS
        // Position of the legend's top-left corner
        const legendStartX = 280; // Adjust to move legend horizontally
        const legendStartY = 120;  // Adjust to move legend vertically
        // Adding the Legend Heading
        svg.append("text")
            .attr("x", legendStartX + 30)
            .attr("y", legendStartY - 15) // Positioning the heading slightly above the legend items
            .style("fill", "#000")
            .style("font-family", "Familjen Grotesk")
            .style("font-size", "16px")
            .style("font-style", "normal")
            .style("font-weight", "500")
            .style("line-height", "22.5px")
            .style("letter-spacing", "-0.32px")
            .text("Activity topic");
        // Generate and position the legend
        const legend = svg.append("g")
            .attr("transform", `translate(${legendStartX}, ${legendStartY})`)
            .selectAll("g")
            .data(arcs.filter(d => d.data.numContributions !== 0))

            .join("g")
            .attr("transform", (d, i) => `translate(${(i % 2) * 120}, ${Math.floor(i / 2) * 20})`);

        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", d => color(d.data.activityName));

        legend.append("text")
            .attr("x", 15)
            .attr("y", 9)
            .style("font-size", "10px")
            .style("fill", "#000")
            .style("font-style", "normal")
            .style("font-weight", "500")
            .style("line-height", "normal")
            .style("font-family", "Familjen Grotesk")
            .text(d => d.data.activityName);

    }, [data]);

    // Return the SVG wrapped inside a container
    return (
        isLoading ?
        <div className="spinning-spinner"></div> :
        
        <div className="pie-chart-container">
            <svg ref={svgRef} width={560} height={312}></svg>
        </div>
    );
}

export default PieChart;
