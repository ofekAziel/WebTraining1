var startTesting = function () {

    test_group('first test group', function() {
        assert(logoNumCheck(), "counting one image logo class element");
        assert(tweetsNumCheck(), "counting 5 tweet-username classes under ot-body class");
        assert(false, "simple unsuccessful test");
    });

    test_group('second test group', function() {
        assert(addNewTweetCheck(), "adding new tweet");
        assert(false, "simple unsuccessful test 2");
        assert(false, "simple unsuccessful test 3");
    });
};

var logoNumCheck = function () {

    var allLogos = document.querySelectorAll("#logo-img");
    return allLogos.length == 1;
};

var tweetsNumCheck = function () {

    return lastTweets.length == 5;
};

var addNewTweetCheck = function () {

    var text = document.getElementById("user-tweet").value;
    newTweet();

    for (user of lastTweets) {

        if (user.username == "Ofek" && user.text == text) {

            lastTweets.pop()
            document.getElementById("last-tweets").lastElementChild.remove();
            return true;
        }
    }

    return false;
};

