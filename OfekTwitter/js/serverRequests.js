var getAllUsers = function () {

    return axios.get('users');
};

var getAllTweets = function () {

    return axios.get('tweets');
};

var postNewTweet = function (userId, text) {

    axios.put('http://10.103.50.193:8080/tweets', {
        user: userId,
        text: text
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(console.log);
};

var getUserById = function (userId) {

    return axios.get('users/' + userId);
};