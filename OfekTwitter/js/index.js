var lastTweets = [
    {username: 'Bobo', text: 'hello followers!'},
    {username: 'Elvis', text: 'this exercise is really easy!'},
    {username: 'Mimi', text: 'I want to go to sleep'},
    {username: 'Bill Gates', text: 'I think 64 bytes should be enough for everyone'},
    {username: 'Frodo', text: 'My precious'}
];

window.onload = function () {
    startTesting();
    createTweets();
    var publishBtn = document.getElementById("publish-btn");
    publishBtn.addEventListener("click", function () {newTweet();});
};

var createTweets = function () {

    lastTweets.forEach(function(tweet){createTweet(tweet.username, tweet.text, "green")});
};

var createTweet = function (name, text, color) {

    var allTweets = document.getElementById("last-tweets");
    var tweet = document.createElement("div");
    tweet.className = "row animated bounceInLeft";
    var userImage = document.createElement("img");
    userImage.src = "http://d33wubrfki0l68.cloudfront.net/187476b214e39af1f1448e57603b720b395dcb87/b2fdf/images/useravatar.png";
    userImage.className = "user-img";
    var details = document.createElement("div");
    details.className = "details";
    var userName = document.createElement("b");
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

    var userTweet = document.getElementById("user-tweet");
    createTweet("Ofek", userTweet.value, "black");
    lastTweets.push({username: "Ofek", text: userTweet.value});
    userTweet.value = "";
};


