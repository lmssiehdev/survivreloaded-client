/***/ "6df31f9c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("d5ec3c16");

var mapDef = {
    mapId: 7,

    desc: {
        name: 'Cobalt',
        icon: 'img/gui/cobalt.svg',
        buttonCss: 'btn-mode-cobalt',
        buttonText: 'index-play-mode-cobalt'
    },

    assets: {
        audio: [{ name: 'spawn_01', channel: 'ui' }, { name: 'ping_unlock_01', channel: 'ui' }, { name: 'ambient_lab_01', channel: 'ambient' }, { name: 'log_13', channel: 'sfx' }, { name: 'log_14', channel: 'sfx' }],

        atlases: ['gradient', 'loadout', 'shared', 'cobalt']
    },

    biome: {
        colors: {
            background: 0x020e18,
            water: 0x003571,
            beach: 0x684836,
            riverbank: 0x443d3a,
            grass: 0x4d5a68,
            underground: 0x1b0d03,
            playerSubmerge: 0x123049,
            playerGhillie: 0x4b5866
        },

        particles: {}
    },

    gameMode: {
        maxPlayers: 80,
        perkMode: true,
        perkModeRoles: ['scout', 'sniper', 'healer', 'demo', 'assault', 'tank']
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);

/***/ }),

