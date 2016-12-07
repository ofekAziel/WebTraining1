var getUserNameById = function (userId, allUsers) {

    for (user of allUsers) {

        if (userId === user._id) {

            return user.username;
        }
    }
};