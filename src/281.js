/***/ "fa71fb59":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__("7400a140");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("8f1e0713");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = __webpack_require__("8ee62bea");

//
// MenuModal
//

var MenuModal = function () {
    function MenuModal(selector) {
        var _this = this;

        (0, _classCallCheck3.default)(this, MenuModal);

        this.selector = selector;
        this.checkSelector = true;
        this.skipFade = false;
        this.visible = false;

        this.onShowFn = function () {};
        this.onHideFn = function () {};

        selector.find('.close').click(function (e) {
            _this.hide();
        });

        this.modalCloseListener = function (e) {
            //console.log('modalCloseListener', e.target);
            if ($(e.target).closest('.modal-close').length == 0 && ($(e.target).is(selector) || !_this.checkSelector)) {
                e.stopPropagation();
                _this.hide();
            }
        };
    }

    (0, _createClass3.default)(MenuModal, [{
        key: 'onShow',
        value: function onShow(fn) {
            this.onShowFn = fn;
        }
    }, {
        key: 'onHide',
        value: function onHide(fn) {
            this.onHideFn = fn;
        }
    }, {
        key: 'isVisible',
        value: function isVisible() {
            return this.visible;
        }
    }, {
        key: 'show',
        value: function show(isModal) {
            if (!this.visible) {
                this.visible = true;

                this.selector.finish();
                this.selector.css('display', 'block');

                this.onShowFn();

                if (!isModal) {
                    $(document).on('click touchend', this.modalCloseListener);
                }
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.visible) {
                this.visible = false;

                if (this.skipFade) {
                    this.selector.css('display', 'none');
                } else {
                    this.selector.fadeOut(200);
                }

                this.onHideFn();

                $(document).off('click touchend', this.modalCloseListener);
            }
        }
    }]);
    return MenuModal;
}();

module.exports = MenuModal;

/***/ }),

/***/ "fb4aa0e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameConfig = __webpack_require__("989ad62a");
var v2 = __webpack_require__("c2a798c8");

// @NOTE: Entries defined as single-element arrays, like fixedSpawns: [{ }],
// are done this way so that util.mergeDeep(...) will function as expected
// when used by derivative maps.
//
// Arrays are not mergeable, so the derived map will always redefine all
// elements if that property is set.

var mapDef = {
    mapId: 11,

    desc: {
        name: 'Eggsplosion',
        icon: 'img/loot/egg_icon.svg',
        buttonCss: 'btn-mode-mayo'
    },

    assets: {
        audio: [{ name: 'club_music_01', channel: 'ambient' }, { name: 'club_music_02', channel: 'ambient' }, { name: 'ambient_steam_01', channel: 'ambient' }],

        atlases: ['gradient', 'loadout', 'shared', 'main', 'eggsplotion']
    },

    biome: {
        colors: {
            background: 0x20536E,
            water: 0x3282ab,
            waterRipple: 0xb3f0ff,
            beach: 0xcdb35b,
            riverbank: 0x905e24,
            grass: 0x80af49,
            underground: 0x1b0d03,
            playerSubmerge: 0x2b8ca4,
            playerGhillie: 0x83af50
        },

        // Global tint adjustment applied to all objects
        valueAdjust: 1.0,

        sound: {
            riverShore: 'sand'
        },

        particles: {
            camera: ''
        },

        tracerColors: {},

        airdrop: {
            planeImg: 'map-plane-01.img',
            planeSound: 'plane_01',
            airdropImg: 'map-chute-01.img'
        }
    },

    // @TODO: This should be hidden from the client. All relevant data should be
    // sent in the JoinedMsg or MapMsg instead.
    gameMode: {
        maxPlayers: 80,

        killLeaderEnabled: true
    }

};

module.exports = mapDef;

/***/ }),

