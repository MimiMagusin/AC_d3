const createLineChart = () => {
  var margin = { top: 30, right: 20, bottom: 30, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

  var svg = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
    .range([0, width])
    .domain([data[0].date, data[data.length - 1].date]);
  
  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, function (d) { return d.value; })]);
  
  var yAxis = d3.axisLeft()
    .scale(y)
    .tickSize(-width) //as wide as our graph
    .ticks(3);
  
  var xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.timeFormat("%Y-%m"));
  
  var valueline = d3.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.value); });

  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
}
