const PORT = 8000;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var session = require('express-session');
var dataHandler = require('./dataHandler');
var functions = require('./functions');

app.use(bodyParser.json());
app.use(express.static(path.resolve('../OfekTwitter/')));
app.use(express.static(path.resolve('../OfekTwitter/html/')));

app.use(session({
    secret: "keyboard cat"
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

app.route('/users').put(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            let users = JSON.parse(content.toString());
            let username = req.body.username;
            let password = req.body.password;
            let confirmPassword = req.body.confirmPassword;

            if ((password === confirmPassword) && functions.validPassword(users, password)) {
                users.push({_id: functions.generateValidId(users), username: username, password: password, following: []});
                dataHandler.writeDataToFile('./jsonFiles/users.json', users)
                res.end(JSON.stringify({result: true}), 'utf-8');
            }
            res.end(JSON.stringify({result: false}), 'utf-8');
        })
});

app.route('/login').put(function (req, res) {

    dataHandler.readDataFromFile('./jsonFiles/users.json')
        .then(function (content) {

            res.writeHead(200, {'Content-Type': 'text/json'});
            let users = JSON.parse(content.toString());
            let username = req.body.username;
            let password = req.body.password;

            for (user of users) {
                if (user.username === username && user.password === password) {
                    req.session.user = user;
                    res.end(JSON.stringify({result: true}), 'utf-8');
                }
            }
            res.end(JSON.stringify({result: false}), 'utf-8');
        })
});

app.route('/session').get(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/json'});
    if (req.session.user != undefined) {

        dataHandler.readDataFromFile('./jsonFiles/users.json')
            .then(function (content) {

                let users = JSON.parse(content.toString());
                res.end(JSON.stringify(functions.getUserById(users, req.session.user._id)), 'utf-8');
            })

    } else {
        res.end(JSON.stringify(req.session.user), 'utf-8');
    }
});
