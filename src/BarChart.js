import React, { Component } from 'react'
import * as d3 from 'd3'
class BarChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            data:this.props.data
        }
    }
    componentDidMount() {
        //const data = [ 2, 4, 2, 6, 8 ]
        
    }
    componentDidUpdate(oldProps,oldState){
    
        
        if((this.props.data !== oldState.data)){
        //   console.log(this.props.data);
        
            this.setState({
                data:this.props.data
            });
            d3.selectAll(this.refs.canvas).select("svg").remove();
            //this.drawBarChart();
        }
        
    }
    // type(d) {
    //     d["Index"]=+d["Index"]
    //     d["DAUID"]=d["DAUID"]
    //     return d
    // }
    drawBarChart()  {

        // const canvasHeight = 400
        // const canvasWidth = 600
        // const scale = 20
        // const svgCanvas = d3.select(this.refs.canvas)
        //     .append("svg")
        //     .attr("width", canvasWidth)
        //     .attr("height", canvasHeight)
        //     .style("border", "1px solid black")
        // svgCanvas.selectAll("rect")
        //     .data(data).enter()
        //         .append("rect")
        //         .attr("width", 40)
        //         .attr("height", (datapoint) => datapoint * scale)
        //         .attr("fill", "orange")
        //         .attr("x", (datapoint, iteration) => iteration * 45)
        //         .attr("y", (datapoint) => canvasHeight - datapoint * scale)
        // svgCanvas.selectAll("text")
        // .data(data).enter()
        //     .append("text")
        //     .attr("x", (dataPoint, i) => i * 45 + 10)
        //     .attr("y", (dataPoint, i) => canvasHeight - dataPoint * scale - 10)
        //     .text(dataPoint => dataPoint)
        //d3.selectAll(this.refs.canvas).select("svg").remove();


        // var tooltip2 = d3.select("body")
        // .append("div")
        // .attr("class", "tooltip2")
        // .html('test')
        // .style("opacity",1);

         //sort bars based on value
         const data = this.state.data.sort(function (a, b) {
             return d3.ascending(a.Index, b.Index);
         })
         this.setState({
             data:data
         })

         //set up svg using margin conventions - we'll need plenty of room on the left for labels
         var margin = {
             top: 15,
             right: 25,
             bottom: 15,
             left: 60
         };

         var width = 500 - margin.left - margin.right,
             height = 400 - margin.top - margin.bottom;

         var svg = d3.select(this.refs.canvas).append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

         var y = d3.scaleLinear()
             .range([height, 0])
             .domain([d3.min(this.state.data, function (d) {
                 return +d.Index;
             }), d3.max(this.state.data, function (d) {
                 return +d.Index;
             })]);

         var x = d3.scaleBand()
             .range([0, width])
             .domain(this.state.data.map(function (d) {
                 return d.DAUID;
             }));

         //make y axis to show bar names
         // var yAxis = d3.svg.axis()
         //     .scale(y)
         //     //no tick marks
         //     .tickSize(0)
         //     .orient("left");

      //    // var gy = svg.append("g")
      //    //     .attr("class", "y axis")
      //    //     .call(yAxis)

         var bars = svg.selectAll(".bar")
             .data(this.state.data)
             .enter()
             .append("g")

         //append rects
         bars.append("rect")
             .attr("class", "bar")
             .style("fill",function(d){return '#dd1c77';})
             .attr("y", function (d) {
                 return y(d.Index);
             })
             .attr("height", function(d) { return height - y(d.Index);} )
             .attr("x", function(d){return x(d.DAUID)})
             .attr("width", x.bandwidth())
            //  .on("mouseover", function(d) {
            //            tooltip2.transition()
            //                .duration(0)
            //                .style("opacity", .9);
            //                tooltip2.html("<p>" + d.DAUID +"</p>")
            //                .style("left", (d3.event.pageX) + "px")
            //                .style("top", (d3.event.pageY - 28) + "px").style("visibility", "visible");

            //                geoLayer2.eachLayer(function (layer) {
            //                  if(layer.feature.properties["DAUID"] == d.DAUID) {
            //                    layer.setStyle({opacity:1,fillOpacity:0.6,weight:6});

            //                  }
            //                });

            //            })
            //    .on("mouseleave", function(d) {
            //        tooltip2.transition()
            //            .duration(500)
            //            .style("opacity", 0);

            //            geoLayer2.eachLayer(function (layer) {

            //              layer.setStyle({opacity:1,fillOpacity:0.3,weight:1})


            //            });
            //    });


             bars.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (0) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("DAUID");


            bars.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height+14)+")")  // centre below axis
            .text("Rank");

    }
    render() {
    
        
        
        
        
        return (<div ref="canvas"></div>); }
}
export default BarChart;