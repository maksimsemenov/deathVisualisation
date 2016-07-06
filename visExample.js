var units = "Widgets";

var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 700 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scaleOrdinal([d3.schemeCategory20]);

// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(0)
    .nodePadding(40)
    .size([width, height]);

var path = sankey.link();

// load the data
var graph = {
  nodes: [
    {node: 0, name: "men-1"},
    {node: 1, name: "men-2"},
    {node: 2, name: "men-3"},
    {node: 3, name: "men-4"},
    {node: 4, name: "men-5"},
    {node: 5, name: "women-1"},
    {node: 6, name: "women-2"},
    {node: 7, name: "women-3"},
    {node: 8, name: "accident"},
    {node: 9, name: "cancer"},
    {node: 10, name: "biological"},

  ],
  links: [
    {source: 0, target: 1, value:15},
    {source: 1, target: 2, value:10},
    {source: 1, target: 10, value:2},
    {source: 1, target: 8, value:1},
    {source: 1, target: 9, value:2},
    {source: 2, target: 3, value:6},
    {source: 2, target: 9, value:3},
    {source: 2, target: 10, value:1},
    {source: 3, target: 4, value:3},
    {source: 3, target: 9, value:1},
    {source: 3, target: 8, value:1},
    {source: 3, target: 10, value:1},
    {source: 4, target: 9, value:2},
    {source: 4, target: 8, value:1},
    {source: 5, target: 6, value:10},
    {source: 6, target: 7, value:6},
    {source: 6, target: 9, value:2},
    {source: 6, target: 8, value:1},
    {source: 6, target: 10, value:1},
    {source: 7, target: 8, value:3},
    {source: 7, target: 9, value:2},
    {source: 7, target: 10, value:1}
  ]
}

var color2 = d3.scaleOrdinal(d3.schemeCategory20).domain(graph.nodes.reduce(function(names, node) {
  var cleanName = node.name.split('-')[0];
  console.log(names, node, cleanName,  names.indexOf(cleanName));
  console.log(names.indexOf(cleanName) > -1 ? names : names.push(cleanName))
  return names.indexOf(cleanName) > -1 ? names : names.push(cleanName)
}, []))

  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(1);


// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .style("stroke", function(d) {return color2(d.source.name.split('-')[0])})
      .sort(function(a, b) { return b.dy - a.dy; });

// add the link titles
  link.append("title")
        .text(function(d) {
    		return d.source.name + " → " +
                d.target.name + "\n" + format(d.value); });

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        console.log(d);
		  return "translate(" + d.x + "," + d.y + ")"; });
    /*.call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() {
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));*/

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { console.log(d); return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {return color2(d.name.split('-')[0])})
      .style("stroke", function(d) {return color2(d.name.split('-')[0])})
    .append("title")
      .text(function(d) {
		  return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  /*node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");*/

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform",
        "translate(" + d.x + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
