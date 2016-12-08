var getAllUsers = function () {

    return axios.get('users');
};

var getAllTweets = function () {

    return axios.get('tweets');
};

var getUserById = function (userId) {

    return axios.get('users/' + userId);
};

var postNewTweet = function (userId, text) {

    axios.put('tweets', {
        user: userId,
        text: text
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(console.log);
};

var updateUserFollowing = function (userId, followUserId) {

    axios.put('user/following', {
        userId: userId,
        followUserId: followUserId
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(console.log);
};