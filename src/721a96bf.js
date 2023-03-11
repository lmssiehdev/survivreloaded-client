/***/ "721a96bf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ObjectDefsList = [__webpack_require__("ac1d0014"), __webpack_require__("1dc8ec07"), __webpack_require__("7e0b70cc"), __webpack_require__("beeed8a4"), __webpack_require__("f3db70d7"), __webpack_require__("5a255578"), __webpack_require__("0d20ab8e"), __webpack_require__("ea3b9366"), __webpack_require__("764654e6"), __webpack_require__("5da5522c"), __webpack_require__("8d0fe896"), __webpack_require__("ad1c4e70"), __webpack_require__("ccb6ad93"), __webpack_require__("63d67e9d"), __webpack_require__("e9b026d5").kQuestDefs, __webpack_require__("590afbba"), __webpack_require__("c8851695"), __webpack_require__("5857a73f"), __webpack_require__("6c7c3050"), __webpack_require__("035f2ecb"), __webpack_require__("bdd17930"), __webpack_require__("d4694c75"), __webpack_require__("3617adcf"), __webpack_require__("1c57769f"), __webpack_require__("759cd591"), __webpack_require__("58819972"), __webpack_require__("27618474"), __webpack_require__("678482a7"), __webpack_require__("2cca17e9"), __webpack_require__("b5a2f8a6"), __webpack_require__("a9a792ce"), __webpack_require__("748c94cc"), __webpack_require__("0b562efc"), __webpack_require__("20caaef9"), __webpack_require__("d7a506cb")];

var ObjectDefs = {};

// Merge all item defs in game-objects/ together into one object
for (var i = 0; i < ObjectDefsList.length; i++) {
    var gameObjectDefs = ObjectDefsList[i];
    var objectTypes = Object.keys(gameObjectDefs);
    for (var j = 0; j < objectTypes.length; j++) {
        var objectType = objectTypes[j];
        if (ObjectDefs[objectType] !== undefined) {
            throw new Error('GameObject ' + objectType + ' is already defined');
        }
        ObjectDefs[objectType] = gameObjectDefs[objectType];
    }
}

module.exports = ObjectDefs;

/***/ }),

