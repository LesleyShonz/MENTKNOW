import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function BarChart() {

    const [data, setData] = useState([]);
    const svgRef = useRef();

    useEffect(() => {
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);



    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // Clear previous render

        const margin = { top: 40, right: 30, bottom: 40, left: 90 }; // Increase top margin
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;;

        const x = d3.scaleBand()
            .domain(data.map(d => d.activityName))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.averageRating)]).nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("fill", "#E5D7FF")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.activityName))
            .attr("y", d => y(d.averageRating))
            .attr("height", d => y(0) - y(d.averageRating))
            .attr("width", x.bandwidth());
        // Add Y Axis Label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Rating (out of 5)");

        svg.append("text")
            .attr("x", 500 / 2)         // center the text
            .attr("y", margin.top / 2)  // position at half of the top margin
            .attr("text-anchor", "middle")  // anchor the text at its middle
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Average rating for each Activity");

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

    }, [data]);

    return <svg ref={svgRef} width={600} height={400}></svg>;
}

export default BarChart;
