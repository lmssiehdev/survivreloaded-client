"use strict";


var ObjectDefsList = [require("./ac1d0014.js"), require("./1dc8ec07.js"), require("./7e0b70cc.js"), require("./beeed8a4.js"), require("./f3db70d7.js"), require("./5a255578.js"), require("./0d20ab8e.js"), require("./ea3b9366.js"), require("./764654e6.js"), require("./5da5522c.js"), require("./8d0fe896.js"), require("./ad1c4e70.js"), require("./ccb6ad93.js"), require("./63d67e9d.js"), require("./e9b026d5.js").kQuestDefs, require("./590afbba.js"), require("./c8851695.js"), require("./5857a73f.js"), require("./6c7c3050.js"), require("./035f2ecb.js"), require("./bdd17930.js"), require("./d4694c75.js"), require("./3617adcf.js"), require("./1c57769f.js"), require("./759cd591.js"), require("./58819972.js"), require("./27618474.js"), require("./678482a7.js"), require("./2cca17e9.js"), require("./b5a2f8a6.js"), require("./a9a792ce.js"), require("./748c94cc.js"), require("./0b562efc.js"), require("./20caaef9.js"), require("./d7a506cb.js")];

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
