var getAllUsers = function () {

    return axios.get('http://10.103.50.193:8080/users');
};

var getAllTweets = function () {

    return axios.get('http://10.103.50.193:8080/tweets');
};

var postNewTweet = function (userId, text) {

    axios.put('http://10.103.50.193:8080/tweets', {
        user: userId,
        text: text
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
};