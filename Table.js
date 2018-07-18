const createTable = () => {
  var table = d3.select('#table').append('table');
  var formatDate = d3.timeFormat("%Y-%m");
  var tbody = table.append('tbody')
  var tr = tbody.selectAll('tr')
    .data(data).enter()
    .append('tr');

  tr.append('td').html(function (d) { return formatDate(d.date); });
  tr.append('td').html(function (d) { return d.category });
  tr.append('td').html(function (d) { return d.value });

  var thead = table.append('thead').append('tr')

  thead.append('th').text("date");
  thead.append('th').text("category");
  thead.append('th').attr("class", "value").text("value");
}
