"use strict";


// @ts-check
var GameObjectDefs = __webpack_require__("721a96bf");

var getItemValue = function getItemValue(objDef) {
    var priceList = GameObjectDefs['prices_1'];
    var priceObj = priceList.rarities.find(function (o) {
        return o.rarity === objDef.rarity;
    });

    return priceObj.price;
};

module.exports = {
    getItemValue: getItemValue
};
