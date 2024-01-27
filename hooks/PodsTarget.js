/*
    Created by OutSystems Experts to fix the iOS deployment target 'IPHONEOS_DEPLOYMENT_TARGET'
    is set to a lower version than the main project 'IPHONEOS_DEPLOYMENT_TARGET'
    Related to: https://github.com/apache/cordova-ios/issues/1386 closed for possible duplicate
    of https://github.com/apache/cordova-ios/issues/1379 (open as of 26/01/2024)
*/

const fs = require('fs-extra');
const path = require('path');
const xcode = require('xcode');
const check_reqs = require('./check_reqs');
const events = require('cordova-common').events;

function PodsTarget () {

}

PodsTarget.prototype.isDirty = function () {
    return this.__dirty;
};

/**
 * set IPHONEOS_DEPLOYMENT_TARGET for all CocoaPods targets
 */
PodsTarget.prototype.setIphoneOsDeploymentTarget = function (projectRoot, deploymentTarget) {
    events.emit('verbose', 'PodsTarget: Starting');
    let __dirty = false;
    return check_reqs.check_cocoapods().then(toolOptions => {
        if (toolOptions.ignore) {
            events.emit('verbose', '=== skip IPHONEOS_DEPLOYMENT_TARGET Settings For Cocoapods Targets');
        } else {
            const podPbxPath = path.join(projectRoot, 'Pods', 'Pods.xcodeproj', 'project.pbxproj');
            const podXcodeproj = xcode.project(podPbxPath);
            podXcodeproj.parseSync();

            const podConfigs = podXcodeproj.pbxXCBuildConfigurationSection();

            Object.values(podConfigs)
                .forEach(podConfig => {
                    __dirty = true;
                    if (podConfig.buildSettings && parseFloat(podConfig.buildSettings.IPHONEOS_DEPLOYMENT_TARGET) < parseFloat(deploymentTarget)){
                        __dirty = true;
                        podConfig.buildSettings.IPHONEOS_DEPLOYMENT_TARGET = deploymentTarget;
                    }
                });
            if (__dirty) {
                fs.writeFileSync(podPbxPath, podXcodeproj.writeSync(), 'utf-8');
                events.emit('verbose', 'PodsTarget: Ended - targets were updated');
            } else {
                events.emit('verbose', 'PodsTarget: Ended - no updates were needed');
            }
            
        }
    });
};

module.exports.PodsTarget = PodsTarget;
