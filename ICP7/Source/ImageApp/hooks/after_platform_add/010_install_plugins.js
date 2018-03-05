#!/usr/bin/env node

var pluginlist = ["cordova-plugin-camera","cordova-plugin-device","cordova-plugin-ionic-keyboard","cordova-plugin-ionic-webview","cordova-plugin-splashscreen","cordova-plugin-whitelist"];

var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    console.log(stdout);
}

pluginlist.forEach(function(plug) {
    exec("cordova plugin add " + plug, puts);
});
