  const createBarChart = () => {
    var maxWidth = 900

    var month_margin = { top: 20, right: 20, bottom: 70, left: 40 },
      month_width = (maxWidth - month_margin.left - month_margin.right),
      month_height = 300 - month_margin.top - month_margin.bottom;

    var svg = d3.select("#month").append("svg")
      .attr("width", maxWidth)
      .attr("height", month_height + month_margin.top + month_margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + month_margin.left + "," + month_margin.top + ")");

    // Add a month to date domain
    const finalDate = data[data.length - 1].date
    const finalMonthPlusOne = finalDate.getMonth() + 1
    const finalDatePlusOne = finalDate.setMonth(finalMonthPlusOne)

    var x = d3.scaleTime()
      .range([0, month_width])
      .domain([data[0].date, finalDatePlusOne]);

    var y = d3.scaleLinear()
      .range([month_height, 0])
      .domain([0, d3.max(data, function (d) { return d.value; })]);

    // Set barWidth relative to the number of data
    const barWidth = () => (maxWidth / data.length * 0.6)

    svg.selectAll("rect")
      .data(data)
      .enter().append("rect")
      .style("fill", "#019875")
      .attr("x", function (d) { return x(d.date); })
      .attr("width", barWidth)
      .attr("y", function (d) { return y(d.value); })
      .attr("height", function (d) { return month_height - y(d.value); })

    var yAxis = d3.axisLeft()
      .scale(y)
      .tickSize(-month_width) //as wide as our graph
      .ticks(3);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

    var xAxis = d3.axisBottom()
      .scale(x)
      .tickFormat(d3.timeFormat("%Y-%m"));


    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + month_height + ")")
      .call(xAxis)

    svg.selectAll("label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .style("fill", "#019875")
      .attr("y", function (d) { return y(d.value); })
      .attr("x", function (d) { return x(d.date); })
      .attr("dy", "-.35em") //vertical align middle
      .attr("dx", ".7em") //vertical align middle
      .text(function (d) { return d.value; });
  }
