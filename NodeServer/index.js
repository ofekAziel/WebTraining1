const PORT = 8000;
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.resolve('../OfekTwitter/')));
app.use(express.static(path.resolve('../OfekTwitter/html/')));

app.listen(PORT, function () {

    console.log('server listening on port: ' + PORT);
});

app.route('/users').get(function (req, res) {

    fs.readFile('./jsonFiles/users.json', function (err, content) {

        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

app.route('/users/:id').get(function (req, res) {

    fs.readFile('./jsonFiles/users.json', function (err, content) {

        var users = JSON.parse(content.toString());
        var user = getUserById(users, req.params.id);
        res.end(JSON.stringify(user), 'utf-8');
    })
});

app.route('/tweets').get(function (req, res) {

    fs.readFile('./jsonFiles/tweets.json', function (err, content) {

        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

// app.route('/tweets').put(function(req, res) {
//
//
// })

var getUserById = function (users, id) {

    var userArr = [];

    for (user of users) {

        if (user._id === id) {

            userArr.push(user);
            return userArr;
        }
    }
};



