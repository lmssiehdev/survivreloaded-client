"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("d5ec3c16");

var mapDef = {
    mapId: 5,

    desc: {
        name: 'Savannah',
        icon: 'img/gui/player-the-hunted.svg',
        buttonCss: 'btn-mode-savannah',
        buttonText: 'index-play-mode-savannah'
    },

    assets: {
        audio: [],

        atlases: ['gradient', 'loadout', 'shared', 'savannah']
    },

    biome: {
        colors: {
            background: 0x1c5b5f,
            water: 0x41a4aa,
            waterRipple: 0x96f0f6,
            beach: 0xcb7132,
            riverbank: 0xb25e24,
            grass: 0xb4b02e,
            underground: 0x3d0d03,
            playerSubmerge: 0x4e9b8f,
            playerGhillie: 0xb0ac2b
        },

        particles: {}
    },

    gameMode: {
        maxPlayers: 80,
        sniperMode: true
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);
