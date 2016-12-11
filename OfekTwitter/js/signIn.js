window.onload = function () {
    $('#signInBtn').click(function () {
        let username = $('#username');
        let password = $('#password');
        tooltipSettings(username, password);

        if (validateUser(username, password)) {
            loginToUserPromise({username: username.val(), password: password.val()}).then(function (res) {
                if (res.data) {
                    swal({
                        title: 'Welcome back ' + username.val() + "!",
                        text: 'Start tweet with your friends!',
                        type: 'success',
                        timer: 2000
                    });
                    setTimeout(function () {
                        username.val("");
                        password.val("");
                        window.location = "../html/index.html";
                    }, 2000);
                } else {
                    swal({
                        title: "Something went wrong!",
                        text: "Username or password not valid. Please try again.",
                        type: 'error'
                    });
                    password.val("");
                }
            }).catch(function (err) {
                console.log(err);
            });
        } else {
            tooltipHandler(username, password);
        }
    });
};

function validateUser(username, password) {
    return username.val() !== "" && password.val() !== "";
}

function tooltipSettings(username, password) {
    username.tooltip({
        trigger: 'manual'
    });

    password.tooltip({
        trigger: 'manual'
    });

    username.focus(function () {
        username.tooltip('hide');
    });

    password.focus(function () {
        password.tooltip('hide');
    });
}

function tooltipHandler(username, password) {
    if (username.val() === "") {
        username.tooltip('show');
        password.tooltip('hide');
    } else if (password.val() === "") {
        password.tooltip('show');
        username.tooltip('hide');
    }
}