var fs = require('fs');

var readDataFromFile = function (path) {

    return new Promise(function (resolve, reject) {

        fs.readFile(path, 'utf8', function (err, data) {

            if (err) {
                reject('Error reading file');
            }

            resolve(data);
        })
    })
};

var writeDataToFile = function (path, dataToWrite) {

    fs.writeFile(path, JSON.stringify(dataToWrite), function (err) {

        if (err) {

            return console.log(err);
        }
    })
};

module.exports = {readDataFromFile: readDataFromFile, writeDataToFile: writeDataToFile};