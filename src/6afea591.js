"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("d5ec3c16");

var mapDef = {
    assets: {
        audio: [],

        atlases: ['gradient', 'loadout', 'shared', 'main', 'valentine']
    },

    desc: {
        name: 'Awesome Blossoms',
        icon: 'img/loot/loot-blossom-icon.svg',
        buttonCss: 'btn-mode-blossoms'
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
            playerSubmerge: 0x2b8ca4,
            playerGhillie: 0x41630a
        },

        sound: {
            riverShore: 'stone'
        },

        particles: {
            camera: 'falling_leaf_spring'
        }
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);
