/***/ "c1e88d07":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("d5ec3c16");

var mapDef = {
    assets: {
        audio: [{ name: 'club_music_01', channel: 'ambient' }, { name: 'club_music_02', channel: 'ambient' }, { name: 'ambient_steam_01', channel: 'ambient' }, { name: 'cluck_01', channel: 'sfx' }, { name: 'cluck_02', channel: 'sfx' }, { name: 'feather_01', channel: 'sfx' }, { name: 'xp_pickup_01', channel: 'ui' }, { name: 'xp_pickup_02', channel: 'ui' }, { name: 'xp_drop_01', channel: 'sfx' }, { name: 'xp_drop_02', channel: 'sfx' }, { name: 'pumpkin_break_01', channel: 'sfx' }]
    },

    gameMode: {
        turkeyMode: true
    }

};

module.exports = util.mergeDeep({}, baseDef, mapDef);

/***/ }),

