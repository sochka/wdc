// data processing implementation
// 

var Promise = require("bluebird");


var executionMap = {
		reduce 			: require("./table/reduce-nulls"),
		order 			: require("./table/order"),
		aggregate 		: require("./table/aggregate"),
		transpose 		: require("./table/transpose"), 
		limit 			: require("./table/limit"),
		reduceMeta		: require("./table/reduce-meta"),
		format 			: require("./table/format"),
		join 			: require("./table/join"),
		merge 			: require("./table/merge"),

		norm 			: require("./stat/norm"),
		pca 			: require("./stat/pca"),
		cluster 		: require("./stat/kmeans"),
		hist 			: require("./stat/hist"),
		corr 			: require("./stat/corr"),
		rank 			: require("./stat/rank"),
		imput 			: require("./stat/imput"),

		query 			: require("./dataset/query"),

		bar				: require("./serie/bar"),
		deps			: require("./serie/deps"),
		geojson			: require("./serie/geojson"),
		scatter			: require("./serie/scatter"),
		line			: require("./serie/line")
}

var getProcess = function(params){
	var processId;
	if(params.useColumnMetadata) processId = "reduceMeta";
	if(params.useRowMetadata) processId =  "reduceMeta";
	if(params.reduce) processId =  "reduce";
	if(params.normalization) processId = "norm";
	if(params.precision) processId = "format";
	if(params.transpose) processId =  "transpose";
	if(params.order) processId =  "order";
	if(params.aggregation) processId =  "aggregate";
	if(params.rank) processId =  "rank";
	if(params.histogram) processId =  "hist";
	if(params.correlation) processId =  "corr";
	if(params.limit) processId =  "limit";
	if(params.cluster) processId =  "cluster";
	if(params.pca) processId =  "pca";
	if(params.inputation) processId =  "imput";
	if(params.join) processId =  "join";
	if(params.merge) processId =  "merge";
	if(params.query) processId =  "query";
	
	if(params.serie) processId =  params.serie;

	// console.log("process",params,processId)
	if(processId) return executionMap[processId]
	return undefined;
	
}

var executeStep = function (table,params){
	// console.log("execute", JSON.stringify(params))
	var process,p;
	if(params.processId){
		process = executionMap[params.processId];
		p = params.settings;
	}else{
		process = getProcess(params);
		p = params;
	}
	
	if(process) return process(table,p);
	return table;
}	
	



module.exports = function(table,params){

	return new Promise(function(resolve){
		var script = (params.script) ? (params.script.forEach) ? params.script: [params.script] : [params];
		var currentTable = table;
		script.forEach(function(operation){
			currentTable = executeStep(currentTable, operation)
		})
		currentTable.postProcess = script;
		resolve(currentTable);
	})
}



// 
// process(table,script).then(function(result){// handle post process result})