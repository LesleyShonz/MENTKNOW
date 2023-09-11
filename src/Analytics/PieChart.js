import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';

function PieChart() {

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
        svg.selectAll('*').remove(); 

        const width = 600;
        const height = 400;
        const radius = Math.min(width - 150, height) / 2;

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        
        const pie = d3.pie()
            .value(d => d.numContributions);
        
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.activityName))
            .range(d3.schemeTableau10);

        const arcs = pie(data);
        const totalContributions = d3.sum(data, d => d.numContributions);

        // Pie sections
        svg.append("g")
            .attr("transform", `translate(${width / 2 - 100}, ${height / 2})`)
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.activityName))
            .attr("d", arc)
            .append("title")  // Add tooltips
            .text(d => `${d.data.activityName}: ${d.data.numContributions}`);

        // Percentage labels
        svg.append("g")
            .attr("transform", `translate(${width / 2 - 100}, ${height / 2})`)
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(d => `${((d.data.numContributions / totalContributions) * 100).toFixed(2)}%`);

        // Legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 100}, ${height / 2 - data.length * 10})`)
            .selectAll("g")
            .data(arcs)
            .join("g");

        // Color swatches
        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("y", (d, i) => i * 20)
            .attr("fill", d => color(d.data.activityName));
        
        // Legend text
        legend.append("text")
            .attr("x", 15)
            .attr("y", (d, i) => i * 20 + 9)
            .text(d => d.data.activityName);

    }, [data]);

    return <svg ref={svgRef} width={600} height={400}></svg>;
}

export default PieChart;
