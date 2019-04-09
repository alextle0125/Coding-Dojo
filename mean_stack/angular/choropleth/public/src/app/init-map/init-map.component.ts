import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

@Component({
  selector: 'app-init-map',
  templateUrl: './init-map.component.html',
  styleUrls: ['./init-map.component.css']
})
export class InitMapComponent implements OnInit {
  us: any;
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
    $("#temperature-nav").removeClass('active');
  	$("#drug-mortality-nav").removeClass('active');
  	$("#teen-birth-nav").removeClass('active');
  	$("#unemployment-nav").removeClass('active');
  	$("#home-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county });
	  		}
	  		let chart = this.chart(this.us, this.dataObj);
	  		$("#map").html(chart);
	  	});
  	});
  }

  chart(us, data) {
  	const path = d3.geoPath();
  	const color = d3.scaleQuantize([0, 1], d3.schemeGreens[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));

	const svg = d3.create("svg")
	  .attr("viewBox", "0 0 960 600")
	  .style("width", "60%")
	  .style("margin", "25px 15%");

	svg.append("g")
	  .attr("class", "counties")
	  .selectAll("path")
	  .data(topojson.feature(us, us.objects.counties).features)
	  .join("path")
	    .attr("fill", d => "#fff")
	    .attr("d", path)
	  .append("title")
	    .text(d => `${d.properties['name']}, ${states.get(d.id.slice(0, 2))['name']}, ${this.format(0)}`);

	svg.append("path")
	  .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
	  .attr("fill", "none")
	  .attr("stroke", "white")
	  .attr("stroke-linejoin", "round")
	  .attr("d", path);

	let hoverEnabled = false;
	svg.selectAll('.counties path').on('mouseover', function(e) {
	  let origColor = $(this).attr('fill');
	  $(this).attr('fill', '#333');
	  $(this).on('mouseout', function(e){
	  	$(this).attr('fill', origColor);
	  });
  	});

	return svg.node();
  }

  legend(g) {
  	  const color = d3.scaleQuantize([0, 1], d3.schemeReds[9]);
	  const x = d3.scaleLinear()
	      .domain(d3.extent(color.domain()))
	      .rangeRound([0, 260]);

	  g.selectAll("rect")
	    .data(color.range().map(d => color.invertExtent(d)))
	    .join("rect")
	      .attr("height", 8)
	      .attr("x", d => x(d[0]))
	      .attr("width", d => x(d[1]) - x(d[0]))
	      .attr("fill", d => color(d[0]));

	  g.append("text")
	      .attr("x", x.range()[0])
	      .attr("y", -6)
	      .attr("fill", "currentColor")
	      .attr("text-anchor", "start")
	      .attr("font-weight", "bold")
	      .text("Violent Crimes Known By Police (%)");

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(2))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	    .select(".domain")
	      .remove();
  }

  format(d) {
  	return `${d}`;
  }
}
