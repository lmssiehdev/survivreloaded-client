"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("d5ec3c16");

var mapDef = {
    mapId: 1,

    desc: {
        name: 'Desert',
        icon: 'img/loot/loot-weapon-flare-gun.svg',
        buttonCss: 'btn-mode-desert',
        buttonText: 'index-play-mode-desert'
    },

    assets: {
        audio: [{ name: 'piano_02', channel: 'sfx' }, { name: 'log_03', channel: 'sfx' }, { name: 'log_04', channel: 'sfx' }, { name: 'piano_music_01', channel: 'ambient' }],

        atlases: ['gradient', 'loadout', 'shared', 'desert']
    },

    biome: {
        colors: {
            background: 0x6a7543,
            water: 0x8a9b4e,
            waterRipple: 0xd1e685,
            beach: 0xc9843a,
            riverbank: 0xb25e24,
            grass: 0xdfa757,
            underground: 0x3d0d03,
            playerSubmerge: 0x4e9b8f,
            playerGhillie: 0xdfa761
        },

        particles: {}
    },

    gameMode: {
        maxPlayers: 80,
        desertMode: true
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);
