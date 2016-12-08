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

app.route('/tweets/:userId').get(function (req, res) {

    fs.readFile('./jsonFiles/tweets.json', function (err, content) {

        var tweets = JSON.parse(content.toString());
        var tweetsById = getTweetsById(tweets, req.params.userId);
        res.end(JSON.stringify(tweetsById), 'utf-8');
    })
});

app.route('/users/following/:id').get(function (req, res) {

    fs.readFile('./jsonFiles/users.json', function (err, content) {

        var users = JSON.parse(content.toString());
        var usersFollowing = usersFollowingById(users, req.params.id);
        res.end(JSON.stringify(usersFollowing), 'utf-8');
    })
});

app.route('/tweets').put(function(req, res) {

    fs.readFile('./jsonFiles/tweets.json', function (err, content) {

        res.writeHead(200, {'Content-Type': 'text/json'});
        var tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.user});
        fs.writeFile('./jsonFiles/tweets.json', JSON.stringify(tweets));
        res.end(JSON.stringify(tweets), 'utf-8');
    })
});

app.route('/user/following').put(function(req, res) {

    fs.readFile('./jsonFiles/users.json', function (err, content) {

        res.writeHead(200, {'Content-Type': 'text/json'});
        var users = JSON.parse(content.toString());
        updateUserFollowing(users, req.body.userId, req.body.followUserId);
        fs.writeFile('./jsonFiles/users.json', JSON.stringify(users));
        res.end(JSON.stringify(users), 'utf-8');
    })
});

var getTweetsById = function (allTweets, userId) {

    var tweetsById = [];

    for (tweet of allTweets) {

        if (tweet.user === userId) {

            tweetsById.push(tweet);
        }
    }

    return tweetsById;
};

var getUserById = function (allUsers, userId) {

    var user;

    for (user of allUsers) {

        if (user._id === userId) {

            return user;
        }
    }
};

var updateUserFollowing = function (allUsers, userId, followUserId) {

    var following = getUserById(allUsers, userId).following;

    if (following.includes(followUserId)) {

        following.splice(following.indexOf(followUserId), 1);
    }
    else {

        following.push(followUserId);
    }
};

var usersFollowingById = function (allUsers, userId) {

    var userFollowing = [];

    for (user of allUsers) {

        for (currFollow of user.following) {

            if (currFollow === userId) {

                userFollowing.push(user);
                break;
            }
        }
    }

    return userFollowing;
};



