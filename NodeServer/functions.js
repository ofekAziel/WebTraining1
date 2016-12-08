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

module.exports = {getTweetsById: getTweetsById, getUserById: getUserById, updateUserFollowing: updateUserFollowing, usersFollowingById: usersFollowingById};