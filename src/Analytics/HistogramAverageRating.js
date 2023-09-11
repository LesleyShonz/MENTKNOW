import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function HistogramAverageRating() {

    const [data, setData] = useState([]);
    const svgRef = useRef();

    useEffect(() => {
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(data => setData(data.map(d => d.averageRating)));  // Extract just the average ratings
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain([0, 5])  // Ratings range from 0 to 5
            .rangeRound([margin.left, width - margin.right]);

        const bins = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(5))  // Split ratings into 5 bins (0-1, 1-2, ...)
            (data);

        const y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length)])
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", d => x(d.x0) + 1)
            .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
            .attr("y", d => y(d.length))
            .attr("height", d => y(0) - y(d.length));

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));
        // X-axis label
        svg.append("text")
            .attr("transform", `translate(${width / 2} ,${height - margin.bottom + 25})`)
            .style("text-anchor", "middle")
            .text("Average Rating");

        // Y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.left - 35)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Activities");

        // Title of the histogram
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top - 10)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Distribution of Average Ratings");

    }, [data]);

    return <svg ref={svgRef} width={600} height={400}></svg>;
}

export default HistogramAverageRating;
