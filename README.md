# Cordova Plugin - Minimum Deployment Target Updater
This Cordova plugin automatically adjusts the minimum deployment target of the Pod target to match the minimum deployment target set by the main iOS project.

## Introduction
This Cordova Plugin simplifies the process of managing minimum deployment targets for iOS projects within a Cordova environment. iOS apps often require a specific minimum deployment target to ensure compatibility across different devices and iOS versions. This plugin automates the adjustment of the minimum deployment target for the Pod target in your Cordova project.

## Features
Automatically syncs the minimum deployment target of the Pod target with the main iOS project.
Reduces manual configuration efforts and ensures consistency across the iOS project.

## Installation
To install the Cordova plugin, use the following command:

### As a standalone
cordova plugin add https://github.com/os-adv-dev/cordova-plugin-pod-target-fix#cordova-ios-7.0

### As a dependency of another plugin (Plugin.xml)
<dependency id="outsystems.experts.podprojectfixiosversion" url="https://github.com/os-adv-dev/cordova-plugin-pod-target-fix" commit="cordova-ios-7.0" />

## Usage
Once installed, the plugin seamlessly integrates into your Cordova project workflow. It automatically updates the minimum deployment target of the Pod target whenever the minimum deployment target is modified in the main iOS project.

## Contributing
We welcome contributions from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository.

## License
This Cordova plugin is licensed under the MIT License.
