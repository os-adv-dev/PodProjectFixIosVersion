const fs = require('fs');
const path = require('path');

const pattern = /return podfileFile\.install\(check_reqs\.check_cocoapods\)\s*\.\s*then\(\(\) => podsjsonFile\.setSwiftVersionForCocoaPodsLibraries\(locations\.root\)\);/;

const newText = `
const PodsTarget = require('./PodsTarget').PodsTarget;
const podsTarget = new PodsTarget();
return podfileFile.install(check_reqs.check_cocoapods)
.then(() => podsjsonFile.setSwiftVersionForCocoaPodsLibraries(locations.root))
.then(() => podsTarget.setIphoneOsDeploymentTarget(locations.root, deploymentTarget));`;

function copyFile(cordovaProjectRoot) {
    const sourceFilePath = path.join(__dirname, 'PodsTarget.js');
    const destinationFilePath = path.join(cordovaProjectRoot, 'node_modules', 'cordova-ios', 'lib', 'PodsTarget.js');
    
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
            return console.log('Error copying file:', err);
        }
        console.log('File was copied successfully.');
    });
}

function modifyFile(cordovaProjectRoot) {
    const filePath = path.join(cordovaProjectRoot, 'node_modules', 'cordova-ios', 'lib', 'prepare.js');
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        const modifiedData = data.replace(pattern, newText);

        if (modifiedData !== data) {
            fs.writeFile(filePath, modifiedData, 'utf8', function(err) {
                if (err) return console.log(err);
                console.log('File successfully modified.');
            });
        } else {
            console.log('Search string not found. No changes were made.');
        }
    });
}

module.exports = function (context) {
    const cordovaProjectRoot = context.opts.projectRoot;
    modifyFile(cordovaProjectRoot);
    copyFile(cordovaProjectRoot);
}