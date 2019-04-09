import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

@Component({
  selector: 'app-drug-mortality',
  templateUrl: './drug-mortality.component.html',
  styleUrls: ['./drug-mortality.component.css']
})
export class DrugMortalityComponent implements OnInit {
  us: any;
  year: any = 2015;
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
  	$("#home-nav").removeClass('active');
  	$("#temperature-nav").removeClass('active');
  	$("#teen-birth-nav").removeClass('active');
  	$("#unemployment-nav").removeClass('active');
  	$("#drug-mortality-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/a5de48f47ef823f17bab376529b75a9d/raw/467fd13f03b54819997e79a8caefba1ea5a70ec3/2015_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < drugPoisoningData.length; j++){
		  				let county;
		  				if(drugPoisoningData[j]['FIPS'].length === 4){
		  					county = `0${drugPoisoningData[j]['FIPS']}`;
		  				} else {
		  					county = drugPoisoningData[j]['FIPS'];
		  				}
			  			if(this.dataObj[i]['id']===county){
			  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
  	const color = d3.scaleQuantize([6, 30], d3.schemeBuGn[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
	this.mapData = new Map(data.map(d => [d.id, +d.drug_mortality]));

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
  	  const color = d3.scaleQuantize([6, 30], d3.schemeBuGn[9]);
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
	      .text("Drug-Related Mortalities Per 100,000 Individuals in Population");

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(2))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	      .style("color", "#fff")
	    .select(".domain")
	      .remove();
  }

  format(d) {
  	return `${d} Drug-Related Mortalities / 100,000 persons`;
  }

  changeYear(year) {
    this.year = year;    
	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
  		if(this.year === 2015){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/a5de48f47ef823f17bab376529b75a9d/raw/467fd13f03b54819997e79a8caefba1ea5a70ec3/2015_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2011').removeClass('active');
		  	$('#2010').removeClass('active');
		  	$('#2015').addClass('active');
		} else if (this.year === 2014){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/51953a7449a16291f9636d2a405d42bb/raw/34c4355b038f579d741b5ad8700134ce14a67c1c/2014_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2015').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2011').removeClass('active');
		  	$('#2010').removeClass('active');
		  	$('#2014').addClass('active');
		} else if (this.year === 2013){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/3f3718db9fb1caef42eb03813c637a25/raw/e512a7794dfd6c5ebd759051caf978755f2d7008/2013_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2011').removeClass('active');
		  	$('#2010').removeClass('active');
		  	$('#2013').addClass('active');
		} else if (this.year === 2012){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/a15ca629a86d9578b26e9a0e03b942da/raw/1187b7658dfb66ac630bd3cad13548b582f0e989/2012_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2011').removeClass('active');
		  	$('#2010').removeClass('active');
		  	$('#2012').addClass('active');	
		} else if (this.year === 2011){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/bfa6340c01a9304ac3e48ef49b3db7cb/raw/1fd6771b9645307f600b89e3c327bcdd66933cff/2011_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2010').removeClass('active');
		  	$('#2011').addClass('active');	
		} else if (this.year === 2010){
		  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, drug_mortality: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/92ed6a613e44966feb62ba1ce8ddcdda/raw/4cbb00d5a76a70d3b4159ad5dba633f3be0b6c6b/2010_NCHS_-_Drug_Poisoning_Mortality_by_County__United_States.csv").then(drugPoisoningData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < drugPoisoningData.length; j++){
			  				let county;
			  				if(drugPoisoningData[j]['FIPS'].length === 4){
			  					county = `0${drugPoisoningData[j]['FIPS']}`;
			  				} else {
			  					county = drugPoisoningData[j]['FIPS'];
			  				}
				  			if(this.dataObj[i]['id']===county){
				  				this.dataObj[i]['drug_mortality'] = parseInt(drugPoisoningData[j]['Estimated Age-adjusted Death Rate, 16 Categories (in ranges)'].match(/[>-](\d+)/)[1]);
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
		  	$('#2015').removeClass('active');
		  	$('#2014').removeClass('active');
		  	$('#2013').removeClass('active');
		  	$('#2012').removeClass('active');
		  	$('#2011').removeClass('active');
		  	$('#2010').addClass('active');	
		}
  	});
  }
}
