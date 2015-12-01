var http = require("http");
var path = require('path');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring'); 

var store = [];

var server = http.createServer(function(req, res) {
  console.log(req.url);
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
      }
    })
  }
  else if (req.url === '/index.css' || req.url === '/detail.css') {
    var where = req.url.slice(1, req.url.indexOf('.')) + '.css';
    fs.readFile(path.join(__dirname, 'public', where), 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, {"Content-Type": "text/css"});
        res.end(data);
      }
    }) 
  }
  else if (req.method === 'POST' && req.url === '/signin') {
    var receive = "";
    req.on('data', function(data) {
      receive += data;
    });
    req.on('end', function() {
      console.log(receive);
      var result = {};
      result.error = false;
      result.data = '';
      var dupli = [];
      var parse_data = JSON.parse(receive);
      for (var i = 0; i < store.length; i++) {
          // result.data += '以下信息重复：姓名、学号、电话、邮箱'
        if (store[i].name === parse_data.name) {
          dupli.push('姓名');
        }
        if (store[i].student_id === parse_data.student_id) {
          dupli.push('学号');
        }
        if (store[i].phone === parse_data.phone) {
          dupli.push('电话');
        }
        if (store[i].email === parse_data.email) {
          dupli.push('邮箱');
        }
      }
      if (dupli.length === 0) {
        store.push(parse_data);
        render_detail(parse_data, function(err, data) {
          if (err) {
            console.log(err);
            result.error = true;
          } else {
            result.error = false;
            result.data = data;
          }
          res.writeHead(200, {"Content-Type": "application/json"});
          res.end(JSON.stringify(result));
        });
      }
    })
  }
  else if (req.url === '/index.js') {
    fs.readFile(path.join(__dirname, 'public', 'index.js'), 'utf-8', function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, {"Content-Type": "text/javascript"});
        res.end(data);
      }
    })
  }
  else if (req.url === '/reset') {
    store = [];
    var result = {};
    result.error = false;
    result.data = '重置成功';
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(result));
  }
  else if (req.url.match(/^\/\?username=(.*)$/) !== null) {
    var name = req.url.match(/^\/\?username=(.*)$/)[1];
    var result = {};
    console.log(name);
    console.log(store);
    var find = -1;
    for (var i = 0; i < store.length; i++) {
      if (store[i].name === name) {
        find = i;
        break;
      }
    }
    if (find !== -1) {
      render_detail(store[find], function(err, data) {
          if (err) {
            console.log(err);
          }
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(data);
        });
    } else {
      res.statusCode = 301;
      res.setHeader('Location', '/');
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Expires", "0");
      res.end();
    }
  }
  else {
    res.statusCode = 301;
    res.setHeader('Location', '/');
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Expires", "0");
    res.end();
  }
});

server.listen(8000);
console.log("Server is listening");
function render_detail(parse_data, callback) {
  fs.readFile(path.join(__dirname, 'public', 'detail.html'), 'utf-8', function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      data = data.replace('{{name}}', parse_data.name);
      data = data.replace('{{student_id}}', parse_data.student_id);
      data = data.replace('{{phone}}', parse_data.phone);
      data = data.replace('{{email}}', parse_data.email);
      callback(null, data);
    }
  }) 
}