var lastTweets = [];
var allUsers = [];
var userFollowingById = [];
var userId = "";
var userName = "";

window.onload = function () {

    axios.all([getAllUsers(), getAllTweets(), getSessionPromise()])
        .then(axios.spread(function (users, tweets, session) {
            if (session.data._id !== undefined) {
                userId = session.data._id;
                userName = session.data.username;
                allUsers = users.data;
                lastTweets = tweets.data;
                getUserById(userId).then(function (user) {
                    userFollowingById = user.data.following;
                    init();
                });
            } else {
                window.location = "../html/signIn.html";
            }
        }))
        .catch(function (error) {
            console.log(error);

        });
};

var init = function () {

    createTweets();
    // startTesting();
    var publishBtn = $("#publish-btn").elements[0];
    publishBtn.addEventListener("click", newTweet);
};

var createTweets = function () {

    lastTweets.forEach(function (tweet) {

        if (userFollowingById.includes(tweet.user) || tweet.user === userId) {

            createTweet(getUserNameById(tweet.user, allUsers), tweet.text, "green");
        }
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
    createTweet(userName, userTweet.value, "black");
    lastTweets.push({user: userId, text: userTweet.value});
    postNewTweet(userId, userTweet.value);
    userTweet.value = "";
};

