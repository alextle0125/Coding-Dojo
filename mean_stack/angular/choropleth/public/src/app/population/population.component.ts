import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

const yearDataDict = {
	1930: 'POP010130D',
	1940: 'POP010140D',
	1950: 'POP010150D',
	1960: 'POP010160D',
	1970: 'POP010170D',
	1980: 'POP010180D',
	1990: 'POP010190D',
	2000: 'POP010200D',
	2010: 'POP010210D'
}

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent implements OnInit {
  us: any;
  year: any = 2010;
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
  	$("#home-nav").removeClass('active');
  	$("#temperature-nav").removeClass('active');
  	$("#health-nav").removeClass('active');
  	$("#crimes-nav").removeClass('active');
  	$("#population-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, population: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/bac49a4742d0a717374a65779ae4b6a0/raw/3429271e0c7f6a0a6222dcc4cca50a8c1e545306/POP01A-Table%25201.csv").then(populationData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < populationData.length; j++){	
			  			if(this.dataObj[i]['id']===populationData[j]['STCOU']){
			  				this.dataObj[i]['population'] = ((populationData[j][yearDataDict[this.year]] / populationData[0][yearDataDict[this.year]]) * 100).toPrecision(3);
			  				break;
			  			} else {
			  				continue;
			  			}
		  			} 
		  		}
		  		let chart = this.chart(this.us, this.dataObj);
		  		$("#map").html(chart);
			});	
	  	});
  	});
  }

  chart(us, data) {
  	const path = d3.geoPath();
  	const color = d3.scaleQuantize([0, 4], d3.schemeBlues[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
	this.mapData = new Map(data.map(d => [d.id, +d.population]));

	const svg = d3.create("svg")
	  .attr("viewBox", "0 0 960 600")
	  .style("width", "60%")
	  .style("height", "auto")
	  .style("margin", "0 15%");

	svg.append("g")
	  .attr("transform", "translate(600,40)")
	  .call(this.legend);

	svg.append("g")
	  .attr("class", "counties")
	  .selectAll("path")
	  .data(topojson.feature(us, us.objects.counties).features)
	  .join("path")
	    .attr("fill", d => color(this.mapData.get(d.id)))
	    .attr("stroke", "#999")
	    .attr("d", path)
	  .append("title")
	    .text(d => `${d.properties['name']}, ${states.get(d.id.slice(0, 2))['name']}, ${this.format(this.mapData.get(d.id))}`);

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
  	  const color = d3.scaleQuantize([0, 4], d3.schemeBlues[9]);
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
	      .text("Population (%)");

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(2))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	    .select(".domain")
	      .remove();
  }

  format(d) {
  	return `${d}%`;
  }

  changeYear(year) {
    this.year = year;    
	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, population: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/bac49a4742d0a717374a65779ae4b6a0/raw/3429271e0c7f6a0a6222dcc4cca50a8c1e545306/POP01A-Table%25201.csv").then(populationData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < populationData.length; j++){	
			  			if(this.dataObj[i]['id']===populationData[j]['STCOU']){
			  				this.dataObj[i]['population'] = ((populationData[j][yearDataDict[this.year]] / populationData[0][yearDataDict[this.year]]) * 100).toPrecision(3);
			  				break;
			  			} else {
			  				continue;
			  			}
		  			} 
		  		}
		  		let chart = this.chart(this.us, this.dataObj);
		  		$("#map").html(chart);
			});	
	  	});
  	});
  }
}
