import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.css']
})
export class LaborComponent implements OnInit {
  us: any;
  year: any = 2017;
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
  	$("#home-nav").removeClass('active');
  	$("#temperature-nav").removeClass('active');
  	$("#teen-birth-nav").removeClass('active');
  	$("#drug-mortality-nav").removeClass('active');
  	$("#unemployment-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/92d6a7ecd4eb3196276ade5520a39b36/raw/c02fc6b08e57242a9625aefeb6f8e342388e37ca/2017_BOLS_Labor_Force_by_County.csv").then(laborData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < laborData.length; j++){
			  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
			  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
  	const color = d3.scaleQuantize([1, 21], d3.schemeYlOrBr[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
	this.mapData = new Map(data.map(d => [d.id, +d.labor]));

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
  	  const color = d3.scaleQuantize([1, 21], d3.schemeYlOrBr[9]);
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
	      .text("Unemployment Rate (%)");

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(2))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	      .style("color", "#fff")
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
  		if(this.year === 2017){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/92d6a7ecd4eb3196276ade5520a39b36/raw/c02fc6b08e57242a9625aefeb6f8e342388e37ca/2017_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2016').removeClass('active');
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2017').addClass('active');
		} else if (this.year === 2016){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/7bb657129d0cfe7598860d15852e6ede/raw/0806259f84ce90f8a6fb326b27864c08c3d679ee/2016_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2017').removeClass('active');
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2016').addClass('active');
		} else if (this.year === 2015){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/d433dc4e53ebded80288fb17d3e83751/raw/44a08fa3223342827b048fb4a9403d10af2fe913/2015_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2017').removeClass('active');
		  	$('#2016').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2015').addClass('active');
		} else if (this.year === 2014){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/85fced93713002e30f0aab8ee8cda2a9/raw/a2ee7b21021b110de1eb9154ea587dc5737528d8/2014_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2017').removeClass('active');
		  	$('#2016').removeClass('active');
		  	$('#2015').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2014').addClass('active');
		} else if (this.year === 2013){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/322719c6bccf157c0669d334d280e040/raw/008fc86609e3712113af739ef12d5a9cc0997a1f/2013_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2017').removeClass('active');
		  	$('#2016').removeClass('active');
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2013').addClass('active');
		} else if (this.year === 2012){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, labor: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/7c20ba5a0ce13a8bcd57c6037b548e56/raw/a22ccc5f9e01f09ac1df59f5f368e605e2c0584c/2012_BOLS_Labor_Force_by_County.csv").then(laborData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < laborData.length; j++){
				  			if(this.dataObj[i]['id']===laborData[j]['FIPS']){
				  				this.dataObj[i]['labor'] = parseInt(laborData[j]['Unemploy ment Rate (%)']);
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
		  	$('#2017').removeClass('active');
		  	$('#2016').removeClass('active');
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').addClass('active');
		}
  	});
  }
}
