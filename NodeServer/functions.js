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

var validPassword = function (users, password) {
    for (user of users) {
        if (password === user.password) {
            return false;
        }
    }
    return true;
};

var generateValidId = function (users) {
    let newId = "";

    do {
        newId = generateRandomString(8) + '-' + generateRandomString(4) + '-' + generateRandomString(4) + '-' +
            generateRandomString(4) + '-' + generateRandomString(12);
    } while(!validId(users, newId));

    return newId;
};

var validId = function (users, id) {
    for (user of users) {
        if (user._id === id) {
            return false;
        }
    }
    return true;
};

var generateRandomString = function (length) {
    let mask = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let index = 0; index < length; index++) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }

    return result;
};

module.exports = {getTweetsById: getTweetsById, getUserById: getUserById, updateUserFollowing: updateUserFollowing, usersFollowingById: usersFollowingById, validPassword: validPassword, generateValidId: generateValidId};