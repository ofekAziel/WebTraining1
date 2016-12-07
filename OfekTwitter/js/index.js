var lastTweets = [];
var allUsers = [];

window.onload = function () {

    axios.all([getAllUsers(), getAllTweets()])
        .then(axios.spread(function (users, tweets) {

            allUsers = users.data;
            lastTweets = tweets.data;
            init();
        }));
};

var init = function () {

    createTweets();
    startTesting();
    var publishBtn = $("#publish-btn").elements[0];
    publishBtn.addEventListener("click", newTweet);
};

var createTweets = function () {

    var userName;

    lastTweets.forEach(function(tweet) {

        userName = "";

        for (user of allUsers) {

            if (tweet.user === user._id) {

                userName = user.username;
                break;
            }
        }

        createTweet(userName, tweet.text, "green");
    });
};

var createTweet = function (name, text, color) {

    var allTweets = $("#last-tweets").elements[0];
    var tweet = document.createElement("div");
    tweet.className = "row animated bounceInLeft";
    var userImage = document.createElement("img");
    userImage.src = "http://d33wubrfki0l68.cloudfront.net/187476b214e39af1f1448e57603b720b395dcb87/b2fdf/images/useravatar.png";
    userImage.className = "user-img";
    var details = document.createElement("div");
    details.className = "details";
    var userName = document.createElement("b");
    userName.className = "tweet-username";
    userName.style.color = color;
    var userTweet = document.createElement("p");

    tweet.appendChild(userImage);
    tweet.appendChild(details);
    details.appendChild(userName);
    details.appendChild(userTweet);
    userName.appendChild(document.createTextNode(name));
    userTweet.appendChild(document.createTextNode(text));
    allTweets.appendChild(tweet);
};

var newTweet = function () {

    var userTweet = $("#user-tweet").elements[0];
    var userId = "cc707c95-f1e3-4caf-906d-f9dd1f394b99";
    createTweet("Reyna", userTweet.value, "black");
    lastTweets.push({user: userId, text: userTweet.value});
    userTweet.value = "";
    postNewTweet(userId, userTweet.value);
};


