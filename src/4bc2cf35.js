"use strict";


var _keys = __webpack_require__("f05b4d6a");

var _keys2 = _interopRequireDefault(_keys);

var _stringify = __webpack_require__("1f15ac6e");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__("7400a140");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__("8f1e0713");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var $ = __webpack_require__("8ee62bea");
var api = __webpack_require__("259eae5b");
var device = __webpack_require__("ce29f17f");
var privacy = __webpack_require__("d84c74f8");

var StreamerListItem = function () {
    /**
     * 
     * @param {any} streamer 
     * @param {HTMLElement | DocumentFragment} parent
     * @param {import('./localization')} localization
     */
    function StreamerListItem(streamer, parent, localization) {
        (0, _classCallCheck3.default)(this, StreamerListItem);

        this.localization = localization;
        /** @type{HTMLTemplateElement} */
        var template = document.querySelector('#streamer_list_item_template');
        var node = template.content.cloneNode(true);
        /** @type{HTMLElement} */
        var card = /** @type{HTMLElement} */node.querySelector('.streamer_list_item');
        this.mount(card, streamer);
        parent.appendChild(node);
    }

    /**
     * 
     * @param {HTMLElement} card 
     * @param {*} streamer 
     */


    (0, _createClass3.default)(StreamerListItem, [{
        key: 'mount',
        value: function mount(card, streamer) {
            /** @type{HTMLAnchorElement} */
            var link = card.querySelector('.streamer_list_item-link');
            /** @type{HTMLImageElement} */
            var img = card.querySelector('.streamer_list_item-img');
            /** @type{HTMLSpanElement} */
            var name = card.querySelector('.streamer_list_item-name');
            /** @type{HTMLSpanElement} */
            var viewers = card.querySelector('.streamer_list_item-viewers');
            var viewersTxt = this.localization.translate(streamer.viewers == 1 ? 'index-viewer' : 'index-viewers');
            link.href = streamer.url;
            img.src = streamer.img;
            name.innerText = streamer.name;
            viewers.innerText = streamer.viewers + ' ' + viewersTxt;
        }
    }]);
    return StreamerListItem;
}();

var SiteInfo = function () {
    /**
     * 
     * @param {import('./config')} config 
     * @param {import('./localization')} localization 
     * @param {*} app 
     */
    function SiteInfo(config, localization, app) {
        (0, _classCallCheck3.default)(this, SiteInfo);

        /**@type {import('./config')} */
        this.config = config;
        /**@type {import('./localization')} */
        this.localization = localization;
        this.app = app;
        this.info = {};
        this.loaded = false;
    }

    (0, _createClass3.default)(SiteInfo, [{
        key: 'load',
        value: function load() {
            var _this = this;

            var locale = this.localization.getLocale();
            var siteInfoUrl = api.resolveUrl('/api/site_info?language=' + locale);
            $.ajax(siteInfoUrl).done(function (data, status) {
                _this.info = data || {};
                _this.loaded = true;
                _this.updatePageFromInfo();
            });
        }
    }, {
        key: 'setAvailableModes',
        value: function setAvailableModes() {
            var availableModes = [];
            var modes = this.info.modes || [];

            var _loop = function _loop(i) {
                var mode = modes[i];

                if (availableModes.some(function (aMode) {
                    return aMode.map === mode.mapName;
                })) {
                    availableModes.find(function (aMode) {
                        return aMode.map == mode.mapName;
                    }).modes.push({ "type": mode.teamMode, "id": i });
                } else {
                    availableModes.push({ "map": mode.mapName, "modes": [{ "type": mode.teamMode, "id": i }] });
                }
            };

            for (var i = 0; i < modes.length; i++) {
                _loop(i);
            }
            this.app.gameModesAvailable = availableModes.filter(function (mode) {
                return mode.map !== 'main';
            });
            this.app.gameModeSelected = [0, 0, 0];
            this.app.lastModeCss = '';
            this.app.updatePlayBtns();
        }
    }, {
        key: 'getAvailableTeamModes',
        value: function getAvailableTeamModes() {
            var availableModes = [];
            var modes = this.info.modes || [];

            var _loop2 = function _loop2(i) {
                var mode = modes[i];
                if (mode.teamMode > 1) {
                    //Add only team modes
                    if (availableModes.some(function (aMode) {
                        return aMode.map === mode.mapName;
                    })) {
                        availableModes.find(function (aMode) {
                            return aMode.map == mode.mapName;
                        }).modes.push({ "type": mode.teamMode, "id": i });
                    } else {
                        availableModes.push({ "map": mode.mapName, "modes": [{ "type": mode.teamMode, "id": i }] });
                    }
                }
            };

            for (var i = 0; i < modes.length; i++) {
                _loop2(i);
            }
            return availableModes;
        }
    }, {
        key: 'updateCyclingMode',
        value: function updateCyclingMode(callback) {
            var _this2 = this;

            var gamesModesUrl = api.resolveUrl('/api/games_modes');
            $.ajax(gamesModesUrl).done(function (data, status) {
                if ((0, _stringify2.default)(_this2.info.modes) != (0, _stringify2.default)(data)) {
                    _this2.info.modes = data || {};
                    callback();
                    _this2.setAvailableModes();
                }
            });
        }
    }, {
        key: 'updatePageFromInfo',
        value: function updatePageFromInfo() {
            var _this3 = this;

            if (!this.loaded) {
                return;
            }

            // Active game modes
            this.setAvailableModes();

            // Region pops
            var pops = this.info.pops;
            if (pops) {
                var regions = (0, _keys2.default)(pops);
                for (var i = 0; i < regions.length; i++) {
                    var region = regions[i];
                    var count = pops[region];
                    var sel = $('[id=server-opts]').children('option[value="' + region + '"]');
                    sel.text(sel.data('label') + ' [' + count + ']');
                }
            }

            /** @type{HTMLDivElement} */
            var streamersList = document.querySelector('#streamers-box_list');
            var listFragment = new DocumentFragment();
            this.info.twitch.forEach(function (streamer) {
                return new StreamerListItem(streamer, listFragment, _this3.localization);
            });
            streamersList.innerHTML = '';
            streamersList.innerHTML = '<div class="font-edit h6 text-gray my-14" \n                                        style="text-align: center;\n                                            font-size: 30px;\n                                            --outline-width: 2px;\n                                            text-shadow: calc(-1 * var(--outline-width)) calc(-1 * var(--outline-width)) 0 #000, var(--outline-width) calc(-1 * var(--outline-width)) 0 #000, calc(-1 * var(--outline-width)) var(--outline-width) 0 #000, var(--outline-width) 0 #000;\n                                    }"> COMING SOON</div>';
            //streamersList.appendChild(listFragment);

            /*
             let featuredYoutuberElem = $('#featured-youtuber');
             let displayYoutuber = this.info.youtube;
             if (displayYoutuber) {
                 $('.btn-youtuber')
                     .attr('href', this.info.youtube.link)
                     .html(this.info.youtube.name);
             }
             featuredYoutuberElem.css('display', displayYoutuber ? 'block' : 'none');
              */
            // Privacy
            if (this.info.promptConsent) {
                privacy.showCookieConsent(this.config);
            }
        }
    }]);
    return SiteInfo;
}();

module.exports = SiteInfo;
