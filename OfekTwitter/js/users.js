var allUsers = [];
var followees = [];
var userId = "";

window.onload = function () {

    axios.all([getAllUsers(), getSessionPromise()])
        .then(axios.spread(function (users, session) {
            if (session.data._id !== undefined) {
                userId = session.data._id;
                allUsers = users.data;

                getUserById(userId).then(function (userById) {
                    followees = userById.data.following;
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

    createUsers();
    createFollowees();
    filter();
};

var filter = function () {

    $("#filter-users").elements[0].addEventListener("keyup", function () {

        var filterText = $("#filter-users").elements[0].value;

        for (var index = 0; index < allUsers.length; index++) {

            if (!allUsers[index].username.includes(filterText)) {

                $("#" + allUsers[index]._id).addClass("hidden");
            }
            else {
                $("#" + allUsers[index]._id).removeClass("hidden");
            }
        }
    });
};

var createFollowees = function () {

    followees.forEach(function(currId){createUser({_id: currId, username: getUserNameById(currId, allUsers)}, "unfollow", "col-xs-12", $("#followees").elements[0])});
};

var createUsers = function () {

    allUsers.forEach(function(currUser) {

        var followStatus = "follow";

        if (currUser._id !== userId) {

            for (followee of followees) {

                if (currUser._id === followee) {

                    followStatus = "unfollow";
                }
            }

            createUser(currUser, followStatus, "col-xs-2", $("#all-users").elements[0]);
        }
    });
};

var createUser = function (currUser, followStatus, colWidth, parent) {

    var user = document.createElement("div");
    user.id = currUser._id;
    user.className = colWidth;
    var userBlock = document.createElement("div");
    userBlock.className = "thumbnail animated rotateIn";
    var userImage = document.createElement("div");
    userImage.className = "user-img";
    var image = document.createElement("img");
    image.src = "http://d33wubrfki0l68.cloudfront.net/187476b214e39af1f1448e57603b720b395dcb87/b2fdf/images/useravatar.png";
    var followBtn = document.createElement("div");
    followBtn.className = "follow-btn";
    var btn = document.createElement("input");
    btn.type = "button";
    btn.className = "btn btn-primary";
    btn.value = followStatus;
    var userName = document.createElement("div");
    userName.className = "user-name";
    var name = document.createElement("span");
    btn.onclick = function () {follow(btn, currUser)};

    user.appendChild(userBlock);
    userBlock.appendChild(userImage);
    userBlock.appendChild(followBtn);
    userBlock.appendChild(userName);
    userImage.appendChild(image);
    followBtn.appendChild(btn);
    userName.appendChild(name);
    name.appendChild(document.createTextNode(currUser.username));
    parent.appendChild(user);
};

var updateUserStatus = function (id) {

    var user = $("#all-users #" + id).elements[0];
    user.getElementsByClassName("btn")[0].value = "follow";
};

var deleteFollowee = function (id) {

    var user = $("#followees #" + id).elements[0];
    user.remove();
};

var follow = function (btn, currUser) {

    if (btn.value == "follow") {

        btn.value = "unfollow";
        followees.push(currUser);
        createUser(currUser, "unfollow", "col-xs-12", $("#followees").elements[0]);
    }
    else {

        btn.value = "follow";
        followees.splice(followees.indexOf(currUser), 1);
        deleteFollowee(currUser._id);
        updateUserStatus(currUser._id);
    }

    updateUserFollowing(userId, currUser._id);
};
