var restify = require('restify'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema

var port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/datatable");

var exampleSchema = new Schema({
	engine: {
		type: String,
	},
	browser: {
		type: String,
	},
	platform: {
		type: String,
	},
	details: [String]
});

var nodes = [
	{
		"engine": "Trident",
		"browser": "Internet Explorer 4.0",
		"platform": "Win 95+",
		"details": [
			"4",
			"X"
		]
	},
	{
		"engine": "Trident",
		"browser": "Internet Explorer 5.0",
		"platform": "Win 95+",
		"details": [
			"5",
			"C"
		]
	},
	{
		"engine": "Trident",
		"browser": "Internet Explorer 5.5",
		"platform": "Win 95+",
		"details": [
			"5.5",
			"A"
		]
	},
	{
		"engine": "Trident",
		"browser": "Internet Explorer 6",
		"platform": "Win 98+",
		"details": [
			"6",
			"A"
		]
	},
	{
		"engine": "Trident",
		"browser": "Internet Explorer 7",
		"platform": "Win XP SP2+",
		"details": [
			"7",
			"A"
		]
	},
	{
		"engine": "Trident",
		"browser": "AOL browser (AOL desktop)",
		"platform": "Win XP",
		"details": [
			"6",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Firefox 1.0",
		"platform": "Win 98+ / OSX.2+",
		"details": [
			"1.7",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Firefox 1.5",
		"platform": "Win 98+ / OSX.2+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Firefox 2.0",
		"platform": "Win 98+ / OSX.2+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Firefox 3.0",
		"platform": "Win 2k+ / OSX.3+",
		"details": [
			"1.9",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Camino 1.0",
		"platform": "OSX.2+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Camino 1.5",
		"platform": "OSX.3+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Netscape 7.2",
		"platform": "Win 95+ / Mac OS 8.6-9.2",
		"details": [
			"1.7",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Netscape Browser 8",
		"platform": "Win 98SE+",
		"details": [
			"1.7",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Netscape Navigator 9",
		"platform": "Win 98+ / OSX.2+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.0",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.1",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.1,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.2",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.2,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.3",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.3,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.4",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.4,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.5",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.5,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.6",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			1.6,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.7",
		"platform": "Win 98+ / OSX.1+",
		"details": [
			1.7,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Mozilla 1.8",
		"platform": "Win 98+ / OSX.1+",
		"details": [
			1.8,
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Seamonkey 1.1",
		"platform": "Win 98+ / OSX.2+",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Gecko",
		"browser": "Epiphany 2.20",
		"platform": "Gnome",
		"details": [
			"1.8",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "Safari 1.2",
		"platform": "OSX.3",
		"details": [
			"125.5",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "Safari 1.3",
		"platform": "OSX.3",
		"details": [
			"312.8",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "Safari 2.0",
		"platform": "OSX.4+",
		"details": [
			"419.3",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "Safari 3.0",
		"platform": "OSX.4+",
		"details": [
			"522.1",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "OmniWeb 5.5",
		"platform": "OSX.4+",
		"details": [
			"420",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "iPod Touch / iPhone",
		"platform": "iPod",
		"details": [
			"420.1",
			"A"
		]
	},
	{
		"engine": "Webkit",
		"browser": "S60",
		"platform": "S60",
		"details": [
			"413",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 7.0",
		"platform": "Win 95+ / OSX.1+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 7.5",
		"platform": "Win 95+ / OSX.2+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 8.0",
		"platform": "Win 95+ / OSX.2+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 8.5",
		"platform": "Win 95+ / OSX.2+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 9.0",
		"platform": "Win 95+ / OSX.3+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 9.2",
		"platform": "Win 88+ / OSX.3+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera 9.5",
		"platform": "Win 88+ / OSX.3+",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Opera for Wii",
		"platform": "Wii",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Nokia N800",
		"platform": "N800",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Presto",
		"browser": "Nintendo DS browser",
		"platform": "Nintendo DS",
		"details": [
			"8.5",
			"C/A<sup>1</sup>"
		]
	},
	{
		"engine": "KHTML",
		"browser": "Konqureror 3.1",
		"platform": "KDE 3.1",
		"details": [
			"3.1",
			"C"
		]
	},
	{
		"engine": "KHTML",
		"browser": "Konqureror 3.3",
		"platform": "KDE 3.3",
		"details": [
			"3.3",
			"A"
		]
	},
	{
		"engine": "KHTML",
		"browser": "Konqureror 3.5",
		"platform": "KDE 3.5",
		"details": [
			"3.5",
			"A"
		]
	},
	{
		"engine": "Tasman",
		"browser": "Internet Explorer 4.5",
		"platform": "Mac OS 8-9",
		"details": [
			"-",
			"X"
		]
	},
	{
		"engine": "Tasman",
		"browser": "Internet Explorer 5.1",
		"platform": "Mac OS 7.6-9",
		"details": [
			"1",
			"C"
		]
	},
	{
		"engine": "Tasman",
		"browser": "Internet Explorer 5.2",
		"platform": "Mac OS 8-X",
		"details": [
			"1",
			"C"
		]
	},
	{
		"engine": "Misc",
		"browser": "NetFront 3.1",
		"platform": "Embedded devices",
		"details": [
			"-",
			"C"
		]
	},
	{
		"engine": "Misc",
		"browser": "NetFront 3.4",
		"platform": "Embedded devices",
		"details": [
			"-",
			"A"
		]
	},
	{
		"engine": "Misc",
		"browser": "Dillo 0.8",
		"platform": "Embedded devices",
		"details": [
			"-",
			"X"
		]
	},
	{
		"engine": "Misc",
		"browser": "Links",
		"platform": "Text only",
		"details": [
			"-",
			"X"
		]
	},
	{
		"engine": "Misc",
		"browser": "Lynx",
		"platform": "Text only",
		"details": [
			"-",
			"X"
		]
	},
	{
		"engine": "Misc",
		"browser": "IE Mobile",
		"platform": "Windows Mobile 6",
		"details": [
			"-",
			"C"
		]
	},
	{
		"engine": "Misc",
		"browser": "PSP browser",
		"platform": "PSP",
		"details": [
			"-",
			"C"
		]
	},
	{
		"engine": "Other browsers",
		"browser": "All others",
		"platform": "-",
		"details": [
			"-",
			"U"
		]
	}
]

var server = restify.createServer();
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser({ mapParams: false }));

function sort(query) {
	var sortObject = {};
	for (var i = 0; i< query.iSortingCols; i++){
		sortObject[query["mDataProp_"+query["iSortCol_"+i]]] = query["sSortDir_"+i]
	}
	return sortObject;
}

function constructSearch(query) {
	var searchQuery = [];
	var search = query.sSearch.trim().split(' ')
	for (var j in search){
		for (var i = 0; i< query.iColumns; i++){
			if (query["bSearchable_"+i]){
				var constructQuery = {}
				if (!searchQuery[j]) {
					searchQuery[j] = [];
				}
				constructQuery[query["mDataProp_"+i]] = new RegExp(search[j]);
				searchQuery[j].push(constructQuery);
			}
		}
	}
	return searchQuery;
}

function search(query){
	var searchQuery = constructSearch(query);
		var findQuery = {
			$and: []
	};
	for (var i = 0; i < searchQuery.length; ++i){
		findQuery.$and.push({
			$or: searchQuery[i]
		})
	}

	return findQuery;
}

server.get("/example", function(req, res, next){
	var directory = mongoose.model('Engine', exampleSchema);

	directory.find(search(req.query)).sort(sort(req.query)).skip(req.query.iDisplayStart).limit(req.query.iDisplayLength).execFind(function(err, nodes){
		directory.count(function(err, count){
			var result = {
				"sEcho": req.query.sEcho,
				"iTotalRecords": count,
				"iTotalDisplayRecords": count,
				"aaData": nodes
			}
			res.send(result);
		})
	})
});

server.post("/example", function(req, res, next){
	var directory = mongoose.model('Engine', exampleSchema);
	directory.create(nodes, function(err, nodes){
		res.send(200);
		console.log("YEEEEES");
	});
});

server.del("/example", function(req, res, next){
	var directory = mongoose.model('Engine', exampleSchema);
	directory.remove(function(err, nodes){
		res.send(200);
		console.log("NOOOOOOO");
	});
});

server.get(/.*/, restify.serveStatic({
	directory: './public',
	default: 'index.html'
}));

console.log('Server started on localhost at port ' + port);
server.listen(port);