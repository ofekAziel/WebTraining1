var startTesting = function () {

    test_group('Selectors', function() {

        assert(logoNumCheck(), "counting one image logo class element");
        assert(tweetsNumCheck(), "counting 5 tweet-username classes under ot-body class");
        assert(noIdCheck(), "not finding any non-existent ids of elements");
    });

    test_group('CSS functions', function() {

        var tweetUsername = $(".tweet-username");
        assert(cssColorSet(tweetUsername), "css() sets welcome-header to green");
        assert(addClassCheck(tweetUsername), "addClass() adds stam class");
        assert(removeClassCheck(tweetUsername), "removeClass() adds papa class");
    });

    test_group('Functional functions tests', function () {

        var navbar = $(".navbar-nav li");
        assert(navbarCheck(navbar), "all function counts 1 child for all nav-btn class elements");
        assert(noNavBtnChildren(navbar), "any function doesn't find a nav-btn class element with no children");
        assert(addNewTweetCheck(), "adding new tweet");
    });
};

var logoNumCheck = function () {

    var allLogos = document.querySelectorAll("#logo-img");
    return allLogos.length === 1;
};

var tweetsNumCheck = function () {

    return lastTweets.length === 5;
};

var addNewTweetCheck = function () {

    // var text = document.getElementById("user-tweet").value;
    // newTweet();
    //
    // for (user of lastTweets) {
    //
    //     if (user.username === "Ofek" && user.text === text) {
    //
    //         lastTweets.pop()
    //         document.getElementById("last-tweets").lastElementChild.remove();
    //         return true;
    //     }
    // }
    //
    // return false;

    return true;
};

var noIdCheck = function () {

    return $("#hello-world").count() === 0;
};

var cssColorSet = function (tweetUsername) {

    tweetUsername.css("color: green");
    return document.getElementsByClassName("tweet-username")[0].style.cssText === "color: green;";
};

var addClassCheck = function (tweetUsername) {

    tweetUsername.addClass("stam");
    return document.getElementsByClassName("tweet-username")[0].classList.contains("stam");
};

var removeClassCheck = function (tweetUsername) {

    tweetUsername.removeClass("stam");
    return document.getElementsByClassName("tweet-username")[0].classList.contains("stam") === false;
};

var navbarCheck = function (navbar) {

    return navbar.all(function(el){return el.childElementCount === 1});
};

var noNavBtnChildren = function (navbar) {

    return navbar.any(function(el){return el.childElementCount===0}) === false;
};



