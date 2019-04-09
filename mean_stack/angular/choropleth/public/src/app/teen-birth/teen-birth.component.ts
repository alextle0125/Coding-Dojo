import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import * as topojson from "topojson-client";

@Component({
  selector: 'app-teen-birth',
  templateUrl: './teen-birth.component.html',
  styleUrls: ['./teen-birth.component.css']
})
export class TeenBirthComponent implements OnInit {
  us: any;
  year: any = 2015;
  mapData: any;
  dataObj: Array<object> = [];

  constructor() { }

  ngOnInit() {
    $("#home-nav").removeClass('active');
  	$("#drug-mortality-nav").removeClass('active');
  	$("#temperature-nav").removeClass('active');
  	$("#unemployment-nav").removeClass('active');
  	$("#teen-birth-nav").addClass('active');
  	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
	  	d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
	  		for(let i = 0; i < countyData.length; i++){
	  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
	  		}
		  	d3.csv("https://gist.githubusercontent.com/alextle0125/1bef01909949031b6fa10db8177e56ea/raw/dc1158486bc159a79511c0d2156d40638a2684cc/2015_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
		  		for(var i = 0; i < this.dataObj.length; i++){
		  			for(var j = 0; j < birthData.length; j++){
		  				if(this.dataObj[i]['id'] === birthData[j]['Combined FIPS Code']){
				  			this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  	const color = d3.scaleQuantize([2, 136], d3.schemePurples[9]);
	const states = new Map(us.objects.states.geometries.map(d => [d.id, d.properties]));
	this.mapData = new Map(data.map(d => [d.id, +d.teen_birth]));

	const svg = d3.create("svg")
	  .attr("viewBox", "0 0 960 600")
	  .style("width", "60%")
	  .style("margin", "25px 15%");

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
  	  const color = d3.scaleQuantize([2, 136], d3.schemePurples[9]);
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
	      .text("Teen Births Per 1,000 Females (Ages 15-19)");

	  g.call(d3.axisBottom(x)
	      .tickSize(13)
	      .tickFormat(d => d.toPrecision(3))
	      .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
	  	  .style("color", "#fff")
	    .select(".domain")
	      .remove();
  }

  format(d) {
  	return `${d} / 1,000 Females`;
  }

  changeYear(year) {
    this.year = year;  
	d3.json("https://cdn.jsdelivr.net/npm/us-atlas@2/us/10m.json").then(data => {
  		this.us = data;
  		if(this.year === 2015){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/1bef01909949031b6fa10db8177e56ea/raw/dc1158486bc159a79511c0d2156d40638a2684cc/2015_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  		} else if(this.year === 2014){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/1240cff9d1bbb1a8e2ab2448db4f764c/raw/98d02584438fe5371dd15745da443a77ba23a76d/2014_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  		} else if(this.year === 2013){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/75e755a6842a88d9025d4ccfa5c04d9f/raw/a2539586d0583239232adc308e7176bc2b88fdda/2013_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  		} else if(this.year === 2012){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/3c895562031d48efad4e03a84ff27336/raw/04efdc77c5cb55be261985a11cf1b8703d1a6e34/2012_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  		} else if(this.year === 2011){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/271e809911ddfc78389433f77af29cd1/raw/3a9d21322f5706430b10235bef51b8ac72ecf5a0/2011_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
  		} else if(this.year === 2010){
  			d3.csv("https://gist.githubusercontent.com/mbostock/682b782da9e1448e6eaac00bb3d3cd9d/raw/0e0a145ded8b1672701dc8b2a702e51c648312d4/unemployment.csv").then(countyData => {
		  		for(let i = 0; i < countyData.length; i++){
		  			this.dataObj.push({ id: countyData[i].id, state: countyData[i].state, county: countyData[i].county, teen_birth: 0 });
		  		}
			  	d3.csv("https://gist.githubusercontent.com/alextle0125/92e83cd9466fc1f71dff4d8a0363e39f/raw/8cdc3cc21987b9bb3d9a3c0b61fd9bf9d9a6ab2f/2010_NCHS_-_Teen_Birth_Rates_for_Age_Group_15-19_in_the_United_States_by_County.csv").then(birthData => {
			  		for(var i = 0; i < this.dataObj.length; i++){
			  			for(var j = 0; j < birthData.length; j++){	
				  			if(this.dataObj[i]['id']===birthData[j]['Combined FIPS Code']){
				  				this.dataObj[i]['teen_birth'] = parseInt(birthData[j]['Birth Rate']);
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
