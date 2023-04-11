"use strict";


var util = require("./util.js");

function defineSkin(baseType, params) {
    return util.mergeDeep({}, BaseDefs[baseType], { baseType: baseType }, params);
}

var BaseDefs = {
    // Ammo
    '9mm': {
        name: '9mm',
        type: 'ammo',
        minStackSize: 15,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0xffae00,
            tintDark: 0xbf8300
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '762mm': {
        name: '7.62mm',
        type: 'ammo',
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x0066ff,
            tintDark: 0x004dbf
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '556mm': {
        name: '5.56mm',
        type: 'ammo',
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x039e00,
            tintDark: 0x027700
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '12gauge': {
        name: '12 gauge',
        type: 'ammo',
        minStackSize: 5,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0xff0000,
            tintDark: 0xbf0000
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '50AE': {
        name: '.50 AE',
        type: 'ammo',
        special: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x292929,
            tintDark: 0x1F1F1F
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '308sub': {
        name: '.308 Subsonic',
        type: 'ammo',
        special: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x313800,
            tintDark: 0x252b00
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    'flare': {
        name: 'Flare',
        type: 'ammo',
        special: true,
        minStackSize: 1,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0xd44600,
            tintDark: 0xd44600
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    '45acp': {
        name: '.45 ACP',
        type: 'ammo',
        special: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x7900ff,
            tintDark: 0x5b00bf
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    'potato_ammo': {
        name: 'Potato Ammo',
        type: 'ammo',
        special: true,
        hideUi: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x743f1e,
            tintDark: 0x743f1e
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },
    'heart_ammo': {
        name: 'Heart Ammo',
        type: 'ammo',
        special: true,
        hideUi: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0xffc0cb,
            tintDark: 0xffc0cb
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },

    'rainbow_ammo': {
        name: 'Rainbow Ammo',
        type: 'ammo',
        special: true,
        hideUi: true,
        noDrop: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            noTint: true
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },

    '40mm': {
        name: '40 mm',
        type: 'ammo',
        special: true,
        minStackSize: 10,
        lootImg: {
            sprite: 'loot-ammo-box.img',
            scale: 0.2,
            tint: 0x0CDDAB,
            tintDark: 0x0CDDAB
        },
        sound: {
            pickup: 'ammo_pickup_01'
        }
    },

    // Backpacks (700 - 709)
    'backpack00': {
        name: 'Pouch',
        type: 'backpack',
        level: 0,
        playerRad: 0.55,
        tint: 0xffffff,
        lootImg: {
            sprite: 'loot-pack-00.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'pack_pickup_01'
        }
    },
    'backpack01': {
        name: 'Small Pack',
        type: 'backpack',
        level: 1,
        playerRad: 0.65,
        tint: 0x663300,
        lootImg: {
            sprite: 'loot-pack-01.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'pack_pickup_01'
        }
    },
    'backpack02': {
        name: 'Regular Pack',
        type: 'backpack',
        level: 2,
        tint: 0x006600,
        playerRad: 0.85,
        lootImg: {
            sprite: 'loot-pack-02.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'pack_pickup_01'
        }
    },
    'backpack03': {
        name: 'Military Pack',
        type: 'backpack',
        level: 3,
        tint: 0x666633,
        playerRad: 1.0,
        lootImg: {
            sprite: 'loot-pack-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'pack_pickup_01'
        }
    },

    // Helmets
    'helmet01': {
        name: 'Level 1 Helmet',
        type: 'helmet',
        level: 1,
        damageReduction: 0.25,
        skinImg: {
            baseTint: 0x317fff,
            baseTintRed: 0xa76b6b,
            baseTintBlue: 0x6290be,
            baseSprite: 'player-circle-base-01.img'
        },
        lootImg: {
            sprite: 'loot-helmet-01.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'helmet_pickup_01'
        }
    },
    'helmet02': {
        name: 'Level 2 Helmet',
        type: 'helmet',
        level: 2,
        damageReduction: 0.4,
        skinImg: {
            baseTint: 0xc6c6c6,
            baseTintRed: 0x990000,
            baseTintBlue: 0x0050a2,
            baseSprite: 'player-circle-base-01.img'
        },
        lootImg: {
            sprite: 'loot-helmet-02.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'helmet_pickup_01'
        }
    },
    'helmet03': {
        name: 'Level 3 Helmet',
        type: 'helmet',
        level: 3,
        damageReduction: 0.55,
        skinImg: {
            baseTint: 0x252525,
            baseTintRed: 0x260404,
            baseTintBlue: 0x05192d,
            baseSprite: 'player-circle-base-01.img'
        },
        lootImg: {
            sprite: 'loot-helmet-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'helmet_pickup_01'
        }
    },
    'helmet04': {
        name: 'Level 4 Helmet',
        type: 'helmet',
        level: 4,
        damageReduction: 0.7,
        skinImg: {
            baseTint: 0x252525,
            baseTintRed: 0x260404,
            baseTintBlue: 0x05192d,
            baseSprite: 'player-circle-base-01.img'
        },
        lootImg: {
            sprite: 'loot-helmet-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'helmet_pickup_01'
        }
    },

    // Chests
    'chest01': {
        name: 'Level 1 Vest',
        type: 'chest',
        level: 1,
        damageReduction: 0.25,
        skinImg: {
            baseTint: 0xb4b4b4,
            baseSprite: 'player-armor-base-01.img'
        },
        lootImg: {
            sprite: 'loot-chest-01.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'chest_pickup_01'
        }
    },
    'chest02': {
        name: 'Level 2 Vest',
        type: 'chest',
        level: 2,
        damageReduction: 0.38,
        skinImg: {
            baseTint: 0x4b4b4b,
            baseSprite: 'player-armor-base-01.img'
        },
        lootImg: {
            sprite: 'loot-chest-02.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'chest_pickup_01'
        }
    },
    'chest03': {
        name: 'Level 3 Vest',
        type: 'chest',
        level: 3,
        damageReduction: 0.45,
        skinImg: {
            baseTint: 0x000000,
            baseSprite: 'player-armor-base-01.img'
        },
        lootImg: {
            sprite: 'loot-chest-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'chest_pickup_01'
        }
    },
    'chest04': {
        name: 'Level 4 Vest',
        type: 'chest',
        noDrop: true,
        level: 4,
        damageReduction: 0.6,
        skinImg: {
            baseTint: 0x1c2e06,
            baseSprite: 'player-armor-base-01.img'
        },
        lootImg: {
            sprite: 'loot-chest-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2,
            innerScale: 0.8
        },
        sound: {
            pickup: 'chest_pickup_01'
        }
    },

    // Scopes
    '1xscope': {
        name: '1x Scope',
        type: 'scope',
        level: 1,
        lootImg: {
            sprite: 'loot-scope-00.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2
        },
        sound: {
            pickup: 'scope_pickup_01'
        }
    },
    '2xscope': {
        name: '2x Scope',
        type: 'scope',
        level: 2,
        lootImg: {
            sprite: 'loot-scope-01.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2
        },
        sound: {
            pickup: 'scope_pickup_01'
        }
    },
    '4xscope': {
        name: '4x Scope',
        type: 'scope',
        level: 4,
        lootImg: {
            sprite: 'loot-scope-02.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2
        },
        sound: {
            pickup: 'scope_pickup_01'
        }
    },
    '8xscope': {
        name: '8x Scope',
        type: 'scope',
        level: 8,
        lootImg: {
            sprite: 'loot-scope-03.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2
        },
        sound: {
            pickup: 'scope_pickup_01'
        }
    },
    '15xscope': {
        name: '15x Scope',
        type: 'scope',
        level: 15,
        lootImg: {
            sprite: 'loot-scope-04.img',
            tint: 0xffffff,
            border: 'loot-circle-outer-01.img',
            borderTint: 0x000000,
            scale: 0.2
        },
        sound: {
            pickup: 'scope_pickup_01'
        }
    }
};

var SkinDefs = {
    // Helmets
    'helmet03_leader': defineSkin('helmet03', {
        name: 'Leader Helmet',
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-leader.img'
        }
    }),
    'helmet03_forest': defineSkin('helmet03', {
        name: 'Shishigami no Kabuto',
        role: 'woods_king',
        mapIndicator: {
            sprite: 'player-king-woods.img',
            tint: 0x00ff00,
            pulse: true,
            pulseTint: 0x00ff00
        },
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-forest.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-forest.img',
            border: 'loot-circle-outer-01.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_moon': defineSkin('helmet03', {
        name: 'Tsukuyomi no Kabuto',
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-moon.img',
            spriteScale: 0.3
        }
    }),
    'helmet03_lt': defineSkin('helmet03', {
        name: 'Lieutenant Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-lieutenant.img',
            spriteScale: 0.3
        }
    }),
    'helmet03_lt_aged': defineSkin('helmet03', {
        name: 'Lieutenant Helmet',
        perk: 'firepower',
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-lieutenant.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-lieutenant.img',
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_potato': defineSkin('helmet03', {
        name: 'K-pot-ato',
        perk: 'rare_potato',
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-potato.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-potato.img',
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_marksman': defineSkin('helmet03', {
        name: 'Marksman Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-marksman.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-marksman.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_recon': defineSkin('helmet03', {
        name: 'Recon Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-recon.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-recon.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_grenadier': defineSkin('helmet03', {
        name: 'Grenadier Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-grenadier.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-grenadier.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet03_bugler': defineSkin('helmet03', {
        name: 'Bugler Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-bugler.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-bugler.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet04_medic': defineSkin('helmet04', {
        name: 'Medic Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-medic.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-medic.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet04_last_man_red': defineSkin('helmet04', {
        name: 'Lone Survivr Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-last-man-01.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-last-man-01.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet04_last_man_blue': defineSkin('helmet04', {
        name: 'Lone Survivr Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-last-man-02.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-last-man-02.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    }),
    'helmet04_leader': defineSkin('helmet04', {
        name: 'Leader Helmet',
        noDrop: true,
        skinImg: {
            baseTint: 0xFFFFFF,
            baseTintRed: 0xFFFFFF,
            baseTintBlue: 0xFFFFFF,
            baseSprite: 'player-helmet-leader.img',
            spriteScale: 0.3
        },
        lootImg: {
            sprite: 'player-helmet-leader.img',
            scale: 0.3,
            rot: Math.PI * 0.5
        }
    })
};

var GearDefs = util.mergeDeep({}, BaseDefs, SkinDefs);
module.exports = GearDefs;
