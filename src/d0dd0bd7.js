"use strict";


var GameConfig = require("./gameConfig.js");
var util = require("./1901e2d9.js");
var v2 = require("./c2a798c8.js");
var baseDef = require("./45f86a38.js");

var mapDef = {
    biome: {
        colors: {
            background: 0x20536E,
            water: 0x3282ab,
            waterRipple: 0xb3f0ff,
            beach: 0xdc9e28,
            riverbank: 0xa37119,
            grass: 0x629522,
            underground: 0x1b0d03,
            playerSubmerge: 0x2b8ca4,
            playerGhillie: 0x659825
        },

        particles: {
            camera: 'falling_leaf_summer'
        }
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);
