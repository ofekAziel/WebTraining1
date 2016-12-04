var currentGroupHTML = "";
var currentGroupResult;

var assert = function (value, name) {

    var result = (value) ? "passed" : "failed";
    currentGroupResult = currentGroupResult && value;
    currentGroupHTML += "<li class='assert " + result + "'>" + name + "</li>";
};

var test_group = function (name, test_group_function) {

    currentGroupResult = true;
    currentGroupHTML = "<div class='testGroup #groupClass'>" + name + "<ul>";
    test_group_function();
    currentGroupHTML += "</ul></div>";
    currentGroupHTML = currentGroupHTML.replace("#groupClass", currentGroupResult ? "passed" : "failed");
    document.body.innerHTML += currentGroupHTML;
};



