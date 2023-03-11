/***/ "f4d48896":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global AppRate,facebookConnectPlugin,NativeStorage */

function facebookLogin(cb) {
    facebookConnectPlugin.login(['public_profile'], function (userData) {
        cb(null, userData);
    }, function (err) {
        cb(err);
    });
}

function googleLogin(cb) {
    window.plugins.googleplus.login({}, function (data) {
        cb(null, data);
    }, function (err) {
        cb(err);
    });
}

function getSystemMemoryInfo(cb) {
    window.chrome.system.memory.getInfo(cb);
}

function promptAppRate(cb) {
    AppRate.preferences = {
        useLanguage: 'en',
        displayAppName: 'bitheroesarena.com',
        usesUntilPrompt: 1,
        promptAgainForEachNewVersion: true,
        inAppReview: true,
        storeAppURL: {
            ios: '1401727934',
            android: 'market://details?id=io.surviv.surviv_io_mobile'
            // windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
            // blackberry: 'appworld://content/[App Id]/',
            // windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
        },
        customLocale: {
            title: 'Enjoying surviv.io?',
            message: "Thanks for playing! It would be a huge help if you rated us. We appreciate your support!",
            cancelButtonLabel: 'No Thanks',
            laterButtonLabel: 'Remind Me Later',
            rateButtonLabel: 'Rate surviv.io'
            // noButtonLabel: 'No thanks',
            // yesButtonLabel: 'Yes!',
            // appRatePromptTitle: 'Do you like playing surviv.io?',
            // feedbackPromptTitle: 'Mind giving us some feedback?',
        },
        callbacks: {
            handleNegativeFeedback: function handleNegativeFeedback() {
                window.open('mailto:admin@surviv.io', '_system');
            },
            onRateDialogShow: function onRateDialogShow(callback) {
                //callback(1); // cause immediate click on 'Rate Now' button
            },
            onButtonClicked: function onButtonClicked(buttonIndex) {
                cb(buttonIndex);
            }
        }
    };
    AppRate.preferences.simpleMode = true;
    AppRate.promptForRating();
}

function hasNativeStorage() {
    return window.NativeStorage !== undefined;
}

function storageGetItem(key, cb) {
    NativeStorage.getItem(key, function (data) {
        cb(null, data);
    }, function (err) {
        cb(err);
    });
}

function storageSetItem(key, value, cb) {
    NativeStorage.setItem(key, value, function (data) {
        cb(null, data);
    }, function (err) {
        cb(err);
    });
}

module.exports = {
    facebookLogin: facebookLogin,
    getSystemMemoryInfo: getSystemMemoryInfo,
    googleLogin: googleLogin,
    promptAppRate: promptAppRate,
    hasNativeStorage: hasNativeStorage,
    storageGetItem: storageGetItem,
    storageSetItem: storageSetItem
};

/***/ }),

/***/ "f6271b77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * invisibleEffect.js
 * Status effect that inmobilizes a player
 */

var v2 = __webpack_require__("c2a798c8");
var math = __webpack_require__("10899aea");
var GameConfig = __webpack_require__("989ad62a");
var StatusEffects = __webpack_require__("41b5258b");

var Anim = GameConfig.Anim;

var InvisibleEffect = function () {
    /**
     * Constructor
     * @param {boolean} runningOnClient Indicates if the effect will run on the client or the server 
     */
    function InvisibleEffect(runningOnClient, params) {
        var _this = this;

        _classCallCheck(this, InvisibleEffect);

        this.id = 10;
        this.name = "m_invisibleEffect";
        this.runningOnClient = runningOnClient;
        this.emitter = null;
        this.ticker = 0;
        this.percentage = 0;
        this.dirty = false;
        this.hadParams = false;

        this.player = null;

        var statusEffect = StatusEffects.find(function (effect) {
            return effect.id === _this.id;
        });
        this.effectData = Object.assign({}, statusEffect, params || {});
        if (!this.effectData.time && this.runningOnClient) this.effectData.time = 99;
    }

    /**
     * Starts the effect 
     * @param {player} player Reference to the player that has the effect 
     * @param {Object} particleBarn Reference to particle manager (Optional only required for the client) 
     */


    _createClass(InvisibleEffect, [{
        key: 'start',
        value: function start(player, particleBarn) {
            player.invisible = true;
            this.ticker = this.effectData.time;
        }

        /**
         * Resets the effect timer
         */

    }, {
        key: 'reset',
        value: function reset() {
            this.ticker = this.effectData.time;
        }

        /**
         * Updates the effect status
         * @param {player} player Reference to the player that has the effect
         * @param {float} dt Delta time since the last call to update
         * @param {array} damageList List to the damage calls
         */

    }, {
        key: 'update',
        value: function update(player, dt, damageList) {
            player.invisible = true;
            if (this.runningOnClient) {
                //
            } else {
                this.setEffectPercentage(this.ticker * 100.0 / this.effectData.time);
            }
        }

        /**
         * Stops the effect
         */

    }, {
        key: 'stop',
        value: function stop(player) {
            this.ticker = 0;
            player.invisible = false;
            if (this.runningOnClient) {
                //
            } else {
                this.setEffectPercentage(0.0);
            }
        }

        /**
         * Updates the effect percentage 
         * @param {float} value new value of the effect 
         */

    }, {
        key: 'setEffectPercentage',
        value: function setEffectPercentage(value) {
            var prev = this.percentage;
            this.percentage = math.clamp(value, 0.0, 100.0);
            if (prev != this.percentage) {
                this.dirty = true;
            }
        }
    }]);

    return InvisibleEffect;
}();

module.exports = InvisibleEffect;

/***/ }),

