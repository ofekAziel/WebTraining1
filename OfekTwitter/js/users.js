var allUsers = ["Marty McFly", "Janis Joplin", "Albert Einstein", "Genghis Khan", "Dracula", "Forest Gump", "Caligula", "Winnie the Pooh", "Obama", "Henry the 8th"];
var followees = [];

window.onload = function () {

    createUsers();
    createFollowees();
    filter();
};

var filter = function () {

    document.getElementById("filter-users").addEventListener("keyup", function () {

        var filterText = document.getElementById("filter-users").value;

        for (var index = 0; index < allUsers.length; index++) {

            if (!allUsers[index].includes(filterText)) {

                document.getElementById(allUsers[index]).classList.add("hidden");
            }
            else {

                document.getElementById(allUsers[index]).classList.remove("hidden");
            }
        }
    });
};

var createUsers = function () {

    allUsers.forEach(function(currUserName){createUser(currUserName, "follow", "col-xs-2", document.getElementById("all-users"))});
};

var createFollowees = function () {

    followees.forEach(function(currUserName){createUser(currUserName, "unfollow", "col-xs-12", document.getElementById("followees"))});
};

var createUser = function (currUserName, followStatus, colWidth, parent) {

    var user = document.createElement("div");
    user.id = currUserName;
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
    btn.onclick = function () {follow(btn, name.innerText)};

    user.appendChild(userBlock);
    userBlock.appendChild(userImage);
    userBlock.appendChild(followBtn);
    userBlock.appendChild(userName);
    userImage.appendChild(image);
    followBtn.appendChild(btn);
    userName.appendChild(name);
    name.appendChild(document.createTextNode(currUserName));
    parent.appendChild(user);
};

var updateUserStatus = function (name) {

    var user = document.querySelector("#all-users [id='" + name + "']");
    user.getElementsByClassName("btn")[0].value = "follow";
};

var deleteFollowee = function (name) {

    var user = document.querySelector("#followees [id='" + name + "']");
    user.remove();
};

var follow = function (btn, name) {

    if (btn.value == "follow") {

        btn.value = "unfollow";
        followees.push(name);
        createUser(name, "unfollow", "col-xs-12", document.getElementById("followees"));
    }
    else {

        btn.value = "follow";
        followees.splice(followees.indexOf(name), 1);
        deleteFollowee(name);
        updateUserStatus(name);
    }
};
