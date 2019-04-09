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
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  us: any;
  year: any = 2011;
  setting: object = { type: 'min-air', min: 22, max: 72 };
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
    $("#home-nav").removeClass('active');
  	$("#drug-mortality-nav").removeClass('active');
  	$("#teen-birth-nav").removeClass('active');
  	$("#unemployment-nav").removeClass('active');
  	$("#temperature-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, temperature: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/8001f228353cab2d731cce48a32d7cff/raw/6c133d2a8b8de853a79f1b871ca9a7beb04c6255/North%2520America%2520Land%2520Data%2520Assimilation%2520System%2520(NLDAS)%2520Daily%2520Air%2520Temperatures%2520and%2520Heat%2520Index%25202011.csv").then(temperatureData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < temperatureData.length; j++){
		  				let county;
		  				if(temperatureData[j]['County Code'].length === 4){
		  					county = `0${temperatureData[j]['County Code']}`;
		  				} else {
		  					county = temperatureData[j]['County Code'];
		  				}
			  			if(this.dataObj[i]['id']===county){
			  				this.dataObj[i]['temperature'] = temperatureData[j]['Avg Daily Min Air Temperature (F)'];
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
  	const color = d3.scaleQuantize([this.setting['min'], this.setting['max']], d3.schemePuRd[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
	this.mapData = new Map(data.map(d => [d.id, +d.temperature]));

	const svg = d3.create("svg")
	  .attr("viewBox", "0 0 960 600")
	  .style("width", "60%")
	  .style("margin", "25px 15%");

	svg.append("g")
	  .attr("transform", "translate(600,40)")
	  .attr("min", this.setting["min"])
	  .attr("max", this.setting["max"])
	  .call(this.legend);

	svg.append("g")
	  .attr("class", "counties")
	  .selectAll("path")
	  .data(topojson.feature(us, us.objects.counties).features)
	  .join("path")
	    .attr("fill", d => color(this.mapData.get(d.id)))
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
  	  let min = parseInt(g._groups[0][0].attributes['min'].value);
  	  let max = parseInt(g._groups[0][0].attributes['max'].value);
  	  const color = d3.scaleQuantize([min, max], d3.schemePuRd[9]);
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
	      .style("color", "#fff")
	      .text("Avg Daily Min Air Temperature (F)");	  	

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(2))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	      .style("color", "#fff")
	    .select(".domain")
	      .remove();
  }

  format(d) {
  	return `${d}°F`;
  }

  getSettings() {
  	return this.setting;
  }

  changeMetric(metric) {
  	this.setting['type'] = metric;
	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, temperature: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/8001f228353cab2d731cce48a32d7cff/raw/6c133d2a8b8de853a79f1b871ca9a7beb04c6255/North%2520America%2520Land%2520Data%2520Assimilation%2520System%2520(NLDAS)%2520Daily%2520Air%2520Temperatures%2520and%2520Heat%2520Index%25202011.csv").then(temperatureData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < temperatureData.length; j++){
		  				let county;
		  				if(temperatureData[j]['County Code'].length === 4){
		  					county = `0${temperatureData[j]['County Code']}`;
		  				} else {
		  					county = temperatureData[j]['County Code'];
		  				}	
			  			if(this.dataObj[i]['id']===county){
			  				if(this.setting['type'] === 'min-air'){
			  					this.setting['min'] = 22;
			  					this.setting['max'] = 72;
				  				this.dataObj[i]['temperature'] = temperatureData[j]['Avg Daily Min Air Temperature (F)'];
			  				} else if (this.setting['type'] === 'max-air'){	
			  					this.setting['min'] = 39;
			  					this.setting['max'] = 88;
			  					this.dataObj[i]['temperature'] = temperatureData[j]['Avg Daily Max Air Temperature (F)'];
			  				} else if (this.setting['type'] === 'max-heat'){
			  					this.setting['min'] = 78;
			  					this.setting['max'] = 96;	
			  					this.dataObj[i]['temperature'] = temperatureData[j]['Avg Daily Max Heat Index (F)'];
			  				}
			  				break;
			  			} else {
			  				continue;
			  			}
		  			} 
		  		}
		  		let chart = this.chart(this.us, this.dataObj);
		  		$("#map").html(chart);
		  		if(this.setting['type'] === 'min-air'){
		  			$($('g text')[0]).text('Avg Daily Min Air Temperature (F)');
		  			$('#max-air').removeClass('active');
		  			$('#max-heat').removeClass('active');
		  			$('#min-air').addClass('active');
		  		} else if (this.setting['type'] === 'max-air'){
		  			$($('g text')[0]).text('Avg Daily Max Air Temperature (F)');
		  			$('#min-air').removeClass('active');
		  			$('#max-heat').removeClass('active');
		  			$('#max-air').addClass('active');
		  		} else if (this.setting['type'] === 'max-heat'){
		  			$($('g text')[0]).text('Avg Daily Max Heat Index (F)');
		  			$('#min-air').removeClass('active');
		  			$('#max-air').removeClass('active');
		  			$('#max-heat').addClass('active');
		  		}
			});	
	  	});
  	});
  }
}
