/***/ "b895abfa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameConfig = __webpack_require__("989ad62a");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var baseDef = __webpack_require__("45f86a38");

var mapDef = {
    biome: {
        colors: {
            background: 0x20536E,
            water: 0x3282ab,
            waterRipple: 0xb3f0ff,
            beach: 0xefb35b,
            riverbank: 0x8a8a8a,
            grass: 0x426609,
            underground: 0x1b0d03,
            playerSubmerge: 0x2b8ca4
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

/***/ }),

