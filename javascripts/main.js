$(document).ready(function() {
    var AllData = [];

    //make DOM function
    function writeDOM() {
        var domeString = "";
        for (var i = 0; i < AllData.length; i++) {
            domeString += `<h1> ${AllData[i].name} </h1>`;
        }
        $("#output").append(domeString);
    };

    //load DropDown menue list 
    function loadDropdownMenu(){
        for (var i = 0; i < AllData.length; i++) {
            if (AllData[i].name !== undefined
            && AllData[i].category === undefined
            && AllData[i].description === undefined){
                $(".dropdown ul").append(`<li><a href="">${AllData[i].name}</a></li>`);  
            }
        }
    };

    var firstCategoriesJSON = function() {
        return new Promise(function(resolve, reject) {
            $.ajax("./db/categories.json").done(function(data1) {
                resolve(data1.categories);
            }).fail(function(error1) {
                reject(error1);
            })
        })
    };

    var secondTypesJSON = function() {
        return new Promise(function(resolve, reject) {
            $.ajax("./db/types.json").done(function(data2) {
                resolve(data2.types);
            }).fail(function(error1) {
                reject(error1);
            })
        })
    };

    var thirdProductsJSON = function() {
    	productarray = []
        return new Promise(function(resolve, reject) {
            $.ajax("./db/products.json").done(function(data3) {
                data3.products.forEach(function(Data1){
                	// console.log("Data1", Data1);
                	//use for in to loop through an object
                	for ( x in Data1){
	                	// console.log("Data1[x]",Data1[x]);
	                	//Data1[x] is the acual object we need but we should 
	                	//push to an array to resolve it 
		                productarray.push(Data1[x]);
		                // console.log("product array",productarray)	
	                	} 
                	//note we should use resolve only one time 
                	resolve(productarray);           	
                });
            }).fail(function(error1) {
                reject(error1);
            })
        })
    };

    //promise all giv me an array of data 
    Promise.all([firstCategoriesJSON(), secondTypesJSON(), thirdProductsJSON()])
    	//then take the arry of data and put on resolved
        .then(function(results){
            // console.log("results", results); // we got [Array(2)]
            results.forEach(function(ajaxCalls) {
                // console.log("ajaxCalls", ajaxCalls); //we got [Object, Object]
                ajaxCalls.forEach(function(cat) {
                    // console.log("cat AND PUSH", cat);// we got each catagory in the jsonfile
                    AllData.push(cat);
                })
            })
            console.log("AllData", AllData);
            writeDOM();
            loadDropdownMenu();
        })


    function printCards(name){


    }


    //when clicking on the dropdown menu
    $(".dropdown-menu").on("click","li",function(event){
        event.preventDefault();
        $(".row").removeClass("hidden");
         console.log ("(this)",$(this).text());
        for (var i = 0; i < AllData.length; i++) {
            if (AllData[i].name === $(this).text()
            && AllData[i].category === undefined
            && AllData[i].description === undefined){
                $(".catagory").text( ($(".catagory").text())+ (AllData[i].name));
                var catId = AllData[i].id ;
                console.log("catId is :",catId)
                for (var j = 0; j < AllData.length; j++) {
                    if (catId === AllData[j].category){
                        // console.log ("AllData[i].category", AllData[i].category);
                        var typeId = AllData[j].id;
                        var typeName= AllData[j].name;
                        console.log("typeId is  :",typeId)
                        console.log("type Name is  :",typeName)
                        $(".type").text( ($(".type").text())+ (AllData[j].name));
                        console.log ("loop in type ",j)


                        for (var k = 0; k < AllData.length; k++) {
                            if(typeId === AllData[k].type
                            && AllData[k].type  !== undefined){
                                console.log("product name ",AllData[k].name);
                                console.log ("loop in products ",k)
                                $(".product").text( ($(".product").text())+ (AllData[k].name));
                            }
                        }
                    }

                    
                }
                
                


            }
        }    
    })
        

});

