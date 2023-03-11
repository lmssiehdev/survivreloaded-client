/***/ "72409abe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__("0e566746");
var PIXI = __webpack_require__("8b1dfb45");
var collider = __webpack_require__("6b42806d");
var GameConfig = __webpack_require__("989ad62a");
var math = __webpack_require__("10899aea");
var util = __webpack_require__("1901e2d9");
var v2 = __webpack_require__("c2a798c8");
var device = __webpack_require__("ce29f17f");
var DebugLines = __webpack_require__("af8ba00f");
var ObjectPool = __webpack_require__("753d6e4b");

function createDeadBodyText() {
    var nameStyle = {
        fontFamily: 'Amiga Forever',
        fontWeight: 'bold',
        fontSize: device.pixelRatio > 1.0 ? 26.0 : 20.0,
        align: 'center',
        fill: 0x021D17,
        stroke: 0x021D17,
        strokeThickness: 0.0,
        dropShadow: false,
        dropShadowColor: '#000000',
        dropShadowBlur: 1.0,
        dropShadowAngle: Math.PI / 3.0,
        dropShadowDistance: 1.0
    };
    var nameText = new PIXI.Text('', nameStyle);
    nameText.anchor.set(0.5, 0.5);
    nameText.scale.set(0.5, 0.5);
    return nameText;
}

function DeadBody() {
    this.active = false;

    this.pos = v2.create(0.0, 0.0);

    this.container = new PIXI.Container();

    this.sprite = PIXI.Sprite.fromImage('loot-deathEffect-icon.img');
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.4, 1.4);
    //this.sprite.tint = 0x5a5a5a;
    this.container.addChild(this.sprite);

    this.nameText = createDeadBodyText();
    this.nameText.anchor.set(0.5, -2.7);
    // this.nameText.tint = util.rgbToInt(util.hsvToRgb(0.0, 0.0, 0.5));
    this.container.addChild(this.nameText);

    this.container.visible = this.sprite;
}

DeadBody.prototype = {
    m_init: function m_init() {},

    m_free: function m_free() {
        this.container.visible = false;
    },

    m_updateData: function m_updateData(data, fullUpdate, isNew, ctx) {
        this.pos = v2.copy(data.pos);

        if (fullUpdate) {
            this.layer = data.layer;
            this.playerId = data.playerId;
        }

        if (isNew) {
            this.nameTextSet = false;
            this.container.visible = true;
        }
    }
};

function m_DeadBodyBarn() {
    this.m_deadBodyPool = new ObjectPool.Pool(DeadBody);
}

m_DeadBodyBarn.prototype = {
    m_update: function m_update(dt, playerBarn, activePlayer, map, camera, renderer) {
        var deadBodies = this.m_deadBodyPool.m_getPool();
        for (var i = 0; i < deadBodies.length; i++) {
            var d = deadBodies[i];
            if (!d.active) {
                continue;
            }

            if (!d.nameTextSet) {
                d.nameText.text = playerBarn.getPlayerName(d.playerId, activePlayer.__id, false);
                d.nameTextSet = true;
            }

            var col = collider.createCircle(d.pos, 1.0);
            var onStairs = map.insideStructureStairs(col);
            var layer = d.layer;
            var zOrd = 12;
            if (d.layer == 0 && activePlayer.layer == 0 && onStairs) {
                layer |= 0x2;
                zOrd += 100;
            }

            renderer.addPIXIObj(d.container, layer, zOrd, d.__id);

            var screenPos = camera.pointToScreen(d.pos);
            var screenScale = camera.pixels(1);
            d.container.position.set(screenPos.x, screenPos.y);
            d.container.scale.set(screenScale, screenScale);
        }
    },

    getDeadBodyById: function getDeadBodyById(playerId) {
        var deadBodies = this.m_deadBodyPool.m_getPool();
        for (var i = 0; i < deadBodies.length; i++) {
            var d = deadBodies[i];
            if (d.active && d.playerId == playerId) {
                return d;
            }
        }
        return null;
    }
};

module.exports = {
    m_DeadBodyBarn: m_DeadBodyBarn
};

/***/ }),

