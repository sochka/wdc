require("./index")("data.xlsx")
	.then(function(r){
		for(i in r.metadata.dimension){
			console.log(i, r.metadata.dimension[i])	
		}
	});