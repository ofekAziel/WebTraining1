const PORT = 8000;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var dataHandler = require('./dataHandler');
var functions = require('./functions');

app.use(bodyParser.json());
app.use(express.static(path.resolve('../OfekTwitter/')));
app.use(express.static(path.resolve('../OfekTwitter/html/')));

app.listen(PORT, function () {

    console.log('server listening on port: ' + PORT);
});

app.route('/users').get(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end(content, 'utf-8');
        })
});

app.route('/users/:id').get(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            var users = JSON.parse(content.toString());
            var user = functions.getUserById(users, req.params.id);
            res.end(JSON.stringify(user), 'utf-8');
        })
});

app.route('/tweets').get(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/tweets.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end(content, 'utf-8');
        })
});

app.route('/tweets/:userId').get(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/tweets.json')
        .then(function (content) {

            var tweets = JSON.parse(content.toString());
            var tweetsById = functions.getTweetsById(tweets, req.params.userId);
            res.end(JSON.stringify(tweetsById), 'utf-8');
        })
});

app.route('/users/following/:id').get(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            var users = JSON.parse(content.toString());
            var usersFollowing = functions.usersFollowingById(users, req.params.id);
            res.end(JSON.stringify(usersFollowing), 'utf-8');
        })
});

app.route('/tweets').put(function(req, res) {

    dataHandler.readDataFromFile('./jsonFiles/tweets.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            var tweets = JSON.parse(content.toString());
            tweets.push({text: req.body.text, user: req.body.user});
            dataHandler.writeDataToFile('./jsonFiles/tweets.json', tweets);
            res.end(JSON.stringify(tweets), 'utf-8');
        })
});

app.route('/user/following').put(function(req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            var users = JSON.parse(content.toString());
            functions.updateUserFollowing(users, req.body.userId, req.body.followUserId);
            dataHandler.writeDataToFile('./jsonFiles/users.json', users);
            res.end(JSON.stringify(users), 'utf-8');
        })
});
