/***/ "d15c07f3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__("81cd031b");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PIXI = __webpack_require__("8b1dfb45");
var collider = __webpack_require__("6b42806d");
var GameConfig = __webpack_require__("989ad62a");
var GameObject = __webpack_require__("8649e148");
var loadouts = __webpack_require__("0503bedc");
var math = __webpack_require__("10899aea");
var v2 = __webpack_require__("c2a798c8");
var util = __webpack_require__("1901e2d9");
var device = __webpack_require__("ce29f17f");

var Camera = __webpack_require__("1ad3d2a4");
var DebugLines = __webpack_require__("af8ba00f");
var Decal = __webpack_require__("172c57dc");
var FirebaseManager = __webpack_require__("f398b7c7");
var Map = __webpack_require__("d49cd95c");
var ObjectPool = __webpack_require__("753d6e4b");
var Particles = __webpack_require__("119e8c4c");
var Player = __webpack_require__("a508b62a");
var Renderer = __webpack_require__("c60b5e9f");
var Smoke = __webpack_require__("0955a76e");

var GameObjectDefs = __webpack_require__("721a96bf");
var StatusEffects = __webpack_require__("41b5258b");

//
// Game
//
function LoadoutDisplay(audioManager, config, inputBinds, account, spineData) {
    this.active = false;
    this.initialized = false;
    this.pixi = null;
    this.m_audioManager = audioManager;
    this.config = config;
    this.m_inputBinds = inputBinds;
    this.account = account;
    this.spineData = spineData;

    /** @type{import('./player').Player*/
    this.player;
}

LoadoutDisplay.prototype = {
    m_init: function m_init() {
        var _this = this;

        this.initPixi();

        this.loadout = loadouts.defaultLoadout();

        this.canvasMode = this.pixi.renderer.type == PIXI.RENDERER_TYPE.CANVAS;
        this.m_camera = new Camera.m_Camera();
        this.renderer = new Renderer.m_Renderer(this, this.canvasMode);
        this.particleBarn = new Particles.m_ParticleBarn(this.renderer);
        this.decalBarn = new Decal.m_DecalBarn();

        this.player = new Player.Player();
        this.player.bodyContainer.x = this.pixi.screen.width / 2;
        this.player.bodyContainer.y = this.pixi.screen.height / 2;
        this.pixi.stage.addChild(this.player.bodyContainer);
        this.view = 'outfit';
        this.viewOld = this.view;
        this.setLoadout(this.loadout);

        this.outfitOld = this.loadout.outfit;

        this.hide();

        this.account.addEventListener('loadout', function (loadout) {
            _this.setLoadout(loadout, true);
        });
        // @NOTE: Necessary because the account could have already loaded
        this.setLoadout(this.account.loadout, true);

        this.initialized = true;

        this.m_resize();
    },

    m_free: function m_free() {
        /*if (this.initialized) {
            this.m_particleBarn.m_free();
            this.m_renderer.m_free();
             while (this.pixi.stage.children.length > 0) {
                let c = this.pixi.stage.children[0];
                this.pixi.stage.removeChild(c);
                c.destroy({
                    children: true
                });
            }
         }*/
        this.initialized = false;
    },

    initPixi: function initPixi() {
        var domCanvas = document.getElementById('modal-customize-list');
        var rendererRes = window.devicePixelRatio > 1.0 ? 2.0 : 1.0;
        if (device.os == 'ios') {
            PIXI.settings.PRECISION_FRAGMENT = 'highp';
        }
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        var createPixiApplication = function createPixiApplication(forceCanvas) {
            return new PIXI.Application({
                width: domCanvas.clientWidth,
                height: domCanvas.clientHeight,
                view: domCanvas,
                antialias: false,
                resolution: rendererRes,
                forceCanvas: forceCanvas,
                transparent: true
            });
        };
        var pixi = null;
        try {
            pixi = createPixiApplication(false);
        } catch (e) {
            pixi = createPixiApplication(true);
        }
        this.pixi = pixi;
        this.pixi.renderer.plugins.interaction.destroy();
        this.pixi.renderer.transparent = true;
    },

    setLoadout: function setLoadout(loadout, skipEffects) {
        this.loadout = loadouts.validateLoadout(loadout);

        this.updateCharDisplay();
        if (skipEffects) {
            this.outfitOld = this.loadout.outfit;
        }

        if (this.player) {
            this.player.playActionStartSfx = true;
        }
        this.animIdleTicker = 0.0;

        var baseSkin = this.loadout.avatar.skin;
        var hair = this.loadout.avatar.hair;
        var baseSkins = baseSkin ? GameObjectDefs[baseSkin].skins : {};
        var hairSkins = hair ? GameObjectDefs[hair].skins : {};
        var skins = (0, _assign2.default)({}, baseSkins, hairSkins);

        if (this.player.spineObj) {
            this.player.changeSkin(skins);
        } else {
            this.player.setSpine(this.spineData, skins);
            this.player.spineObj.scale.set(8);
            this.player.spineObj.position.set(-2, 154);
        }
    },

    setView: function setView(view) {
        this.viewOld = this.view;
        this.view = view;
    },

    updateCharDisplay: function updateCharDisplay() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    },

    show: function show() {
        if (this.active) {
            return;
        }

        this.active = true;
        this.m_resize();
    },

    hide: function hide() {
        if (!this.active) {
            return;
        }

        this.active = false;
    },

    m_update: function m_update(dt, hasFocus) {

        var debug = {};
        debug.render = debug.render || {};

        //this.m_audioManager.cameraPos = v2.copy(this.m_camera.pos);

        // Throw out an idle anim once in a while
        /*if (hasFocus) {
            if (this.view != this.viewOld &&
                (this.view == 'heal' || this.view == 'boost')) {
                this.animIdleTicker = 0.0;
            }
            this.viewOld = this.view;
             this.animIdleTicker -= dt;
            if (this.animIdleTicker < 0.0) {
                if (this.view == 'heal') {
                    this.actionSeq = (this.actionSeq + 1) % 8;
                    let options = {
                        actionType: GameConfig.Action.UseItem,
                        actionItem: 'bandage',
                        actionSeq: this.actionSeq
                    };
                    this.updateCharDisplay(options);
                    this.animIdleTicker = 2.0 + Math.random();
                } else if (this.view == 'boost') {
                    this.actionSeq = (this.actionSeq + 1) % 8;
                    let options = {
                        actionType: GameConfig.Action.UseItem,
                        actionItem: 'soda',
                        actionSeq: this.actionSeq
                    };
                    this.updateCharDisplay(options);
                    this.animIdleTicker = 2.0 + Math.random();
                } else if (this.view == 'deathEffect') {
                    let options = {
                        deadEffect: true
                    };
                    this.updateCharDisplay(options);
                    this.animIdleTicker = 2.0 + Math.random();
                } else if (this.view != 'emote' &&
                    this.view != 'crosshair') {
                    this.animSeq = (this.animSeq + 1) % 8;
                    let options = {
                        animType: GameConfig.Anim.Melee,
                        animSeq: this.animSeq
                    };
                    this.updateCharDisplay(options);
                    this.animIdleTicker = 1.5 + Math.random();
                }
            }
        }*/

        // Play a sound when changing oufits
        /*let outfitDirty = this.loadout.outfit != this.outfitOld;
        this.outfitOld = this.loadout.outfit;
        if (hasFocus && outfitDirty) {
            const itemDef = GameObjectDefs[this.loadout.outfit];
            if (itemDef) {
                this.m_audioManager.playSound(
                    itemDef.sound.pickup, {
                        channel: 'ui'
                    }
                );
            }
        }*/

        /*this.particleBarn.m_update(
            dt,
            this.m_camera,
            debug
        );
        this.decalBarn.m_update(
            dt,
            this.m_camera,
            this.m_renderer,
            debug
        );
        this.renderer.m_update(
            dt,
            this.m_camera,
            this.m_map,
            debug
        );*/

        //this.player.playActionStartSfx = false;

        // Render
        //this.m_render(dt, debug);

    },

    m_render: function m_render(dt, debug) {
        /*let grassColor = this.m_map.mapLoaded ?
            this.m_map.getMapDef().biome.colors.grass : 0x80af49;
         this.pixi.renderer.backgroundColor = grassColor;
         // Module rendering
        this.m_playerBarn.render(this.m_camera, debug);
        this.m_map.render(this.m_camera);*/

        //DebugLines.flush();
    },

    m_resize: function m_resize() {
        //if (this.initialized) {
        /* this.m_camera.screenWidth = device.screenWidth;
        this.m_camera.screenHeight = device.screenHeight;
         this.m_map.resize(this.pixi.renderer, this.canvasMode);
        this.m_renderer.resize(this.m_map, this.m_camera); */

        // @NOTE: recalculating getCameraLoadoutOffset every frame,
        // rather than only on resize, has an effect of reducing the
        // zoom motion a bit when switching into the loadout view.
        // Might be worth considering if that effect is desired.
        //this.m_camera.m_targetZoom = this.getCameraTargetZoom();
        //this.cameraOffset = this.getCameraLoadoutOffset();
        //}
    }
};

module.exports = { LoadoutDisplay: LoadoutDisplay };

/***/ }),

