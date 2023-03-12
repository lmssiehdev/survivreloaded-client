"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("fc096113");

var mapDef = {
    assets: {
        audio: [{ name: 'pumpkin_break_01', channel: 'sfx' }, { name: 'potato_01', channel: 'sfx' }, { name: 'potato_02', channel: 'sfx' }, { name: 'potato_pickup_01', channel: 'ui' }],

        atlases: ['gradient', 'loadout', 'shared', 'potato']
    },

    biome: {
        colors: {
            background: 0x20536E,
            water: 0x3282ab,
            waterRipple: 0xb3f0ff,
            beach: 0xf4ae48,
            riverbank: 0x8a8a8a,
            grass: 0x5c910a,
            underground: 0x1b0d03,
            playerSubmerge: 0x2b8ca4
        },

        particles: {
            camera: 'falling_leaf_potato'
        }
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);
