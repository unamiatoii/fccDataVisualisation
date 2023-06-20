 // Fetch the GDP data
 fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
 .then(response => response.json())
 .then(data => {
   const dataset = data.data;
   
   // Set up the chart dimensions
   const width = 800;
   const height = 400;
   const padding = 40;
   
   // Create the SVG container
   const svg = d3.select("#chart")
     .append("svg")
     .attr("width", width)
     .attr("height", height);
   
   // Create the x-axis scale and axis
   const xScale = d3.scaleTime()
     .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
     .range([padding, width - padding]);
   
   const xAxis = d3.axisBottom(xScale);
   
   svg.append("g")
     .attr("id", "x-axis")
     .attr("transform", `translate(0, ${height - padding})`)
     .call(xAxis);
   
   // Create the y-axis scale and axis
   const yScale = d3.scaleLinear()
     .domain([0, d3.max(dataset, d => d[1])])
     .range([height - padding, padding]);
   
   const yAxis = d3.axisLeft(yScale);
   
   svg.append("g")
     .attr("id", "y-axis")
     .attr("transform", `translate(${padding}, 0)`)
     .call(yAxis);
   
   // Create the bars
   svg.selectAll(".bar")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("class", "bar")
     .attr("x", (d) => xScale(new Date(d[0])))
     .attr("y", (d) => yScale(d[1]))
     .attr("width", width / dataset.length)
     .attr("height", (d) => height - padding - yScale(d[1]))
     .attr("data-date", (d) => d[0])
     .attr("data-gdp", (d) => d[1])
     .on("mouseover", (d) => {
       const tooltip = d3.select("#tooltip");
       tooltip.style("opacity", 0.9);
       tooltip.style("left", d3.event.pageX + 10 + "px");
       tooltip.style("top", d3.event.pageY + 10 + "px");
       tooltip.attr("data-date", d[0]);
       tooltip.html(`${d[0]}<br>$${d[1]} Billion`);
     })
     .on("mouseout", () => {
       const tooltip = d3.select("#tooltip");
       tooltip.style("opacity", 0);
     });
 });