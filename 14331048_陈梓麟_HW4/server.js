var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
function lg(some) {
	console.log(some);
}
var server = http.createServer(function(req, res) {
	var req_url = url.parse(req.url, true);
	lg (req_url);
	if (req_url.pathname == '/path' && req_url.query.what == 'num'){
		res.writeHead(200,{'Content-Type': 'text/json'});
		res.end(JSON.stringify({'num':Math.ceil(Math.random()*10)}));
	} else if (req_url.path == '/' || req_url.path == '/index.html'){
		fs.readFile('index.html','utf8', function(err, data) {
			if (!err) {
				res.writeHead(200,{'Content-Type': 'text/html'});
				res.end(data);
			} else {
				res.writeHead(404,{'Content-Type': 'text/plain'});
				res.end(404);
			}
		});
	} else {
		var p = path.parse(req_url.path);
		lg(p);
		if (p.ext == '.css' || p.ext == '.js') {
			fs.readFile(req_url.path.substr(1), function(err, data) {
				if (!err) {
					res.writeHead(200,{'Content-Type': 'text/'+p.ext.substr(1)});
					res.end(data);
				} else {
					res.writeHead(404,{'Content-Type': 'text/plain'});
					res.end('404 ERROR');
				}
			});
		} else if (p.ext == '.png') {
			fs.readFile(req_url.path.substr(1), function(err, data) {
				if (!err) {
					res.writeHead(200,{'Content-Type': 'image/'+p.ext.substr(1)});
					res.end(data);
				} else {
					res.writeHead(404,{'Content-Type': 'text/plain'});
					res.end('404 ERROR');
				}
			});
		}

	}
});
server.listen(8080);