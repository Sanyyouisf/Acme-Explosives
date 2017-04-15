$(document).ready(function(){
    
    var AllData =[];

    //make DOM function
    function writeDOM(){
    	// console.log(" the writeDOM function");
    	var domeString = "";
    	for (var i=0 ; i< AllData.length; i++){
    		domeString += `<h1> ${AllData[i].name} </h1>`;
    	}
    	$("#output").append(domeString);
    }

	var firstCategoriesJSON = function(){
		return new Promise (function(resolve,reject){
			$.ajax ("./db/categories.json").done(function(data1){
				resolve(data1.categories);
			}).fail (function(error1){
				reject(error1);
			})
		})
	};

	var secondTypesJSON = function(){
		return new Promise (function(resolve,reject){
			$.ajax ("./db/types.json").done(function(data2){
				resolve(data2.types);
			}).fail (function(error1){
				reject(error1);
			})
		})
	};

	var thirdProductsJSON = function(){
		return new Promise (function(resolve,reject){
			$.ajax ("./db/products.json").done(function(data3){
				console.log("data3",data3);
				resolve(data3.products);
				console.log("data3.products",data3.products);
			}).fail (function(error1){
				reject(error1);
			})
		})
	};


	Promise.all ([ firstCategoriesJSON(),secondTypesJSON(),thirdProductsJSON()])
		.then (function(results){
			console.log("results", results);// we got [Array(2)]
			results.forEach(function(ajaxCalls){
				console.log("ajaxCalls", ajaxCalls);//we got [Object, Object]
				ajaxCalls.forEach(function(cat){
					// console.log("cat AND PUSH", cat);// we got each catagory in the jsonfile
					AllData.push(cat);
				})
			})
			console.log("AllData", AllData);
			writeDOM();
		})

});