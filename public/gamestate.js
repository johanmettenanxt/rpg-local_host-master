class GameState {
    constructor() {
        this.defaultPlayer = {
            name: 'Player 1', level: 1, exp: 0, expToNextLevel: 100,
            health: 203, maxHealth: 203, mana: 125, maxMana: 125,
            gold: 200, strength: 10, intelligence: 10, defense: 5, speed: 5,
            inventory: [], equippedWeapon: null, equippedArmor: null, equippedAmulet: null,
            bossDefeats: {}, totalKills: 0, materials: {}
        };
        this.player = JSON.parse(JSON.stringify(this.defaultPlayer));
        this.player.inventory = [];
        this.player.bossDefeats = {};
        this.player.totalKills = 0;
        this.player.materials = {};
        this.shops = this.buildShopInventory();
        this.specialShop = this.buildAmuletShopInventory();
        this.dropTables = {
            1: [
                { id: 'goblin_coin', name: 'Goblin Coin', icon: '👛', price: 25, rarity: 'common', dropRate: 0.50, material: true },
                { id: 'copper_ore', name: 'Copper Ore', icon: '🟠', price: 35, rarity: 'common', dropRate: 0.40, material: true },
                { id: 'forest_herb', name: 'Forest Herb', icon: '🍃', price: 75, rarity: 'uncommon', dropRate: 0.20, material: true },
                { id: 'wooden_ring', name: 'Wooden Ring', icon: '💍', price: 250, rarity: 'legendary', dropRate: 0.05 }
            ],
            5: [
                { id: 'orc_fang', name: 'Orc Fang', icon: '🦷', price: 40, rarity: 'common', dropRate: 0.45, material: true },
                { id: 'silver_dust', name: 'Silver Dust', icon: '✨', price: 60, rarity: 'common', dropRate: 0.40, material: true },
                { id: 'shadow_essence', name: 'Shadow Essence', icon: '🌑', price: 125, rarity: 'uncommon', dropRate: 0.25, material: true },
                { id: 'cursed_amulet_loot', name: 'Cursed Amulet', icon: '🔮', price: 400, rarity: 'legendary', dropRate: 0.06 }
            ],
            10: [
                { id: 'dark_crystal', name: 'Dark Crystal', icon: '⚫', price: 75, rarity: 'common', dropRate: 0.50, material: true },
                { id: 'bone_fragment', name: 'Bone Fragment', icon: '🦴', price: 50, rarity: 'common', dropRate: 0.45, material: true },
                { id: 'soul_stone', name: 'Soul Stone', icon: '💀', price: 175, rarity: 'uncommon', dropRate: 0.22, material: true },
                { id: 'demonic_seal', name: 'Demonic Seal', icon: '👿', price: 600, rarity: 'legendary', dropRate: 0.08 }
            ],
            20: [
                { id: 'dragon_scale', name: 'Dragon Scale', icon: '🐲', price: 125, rarity: 'common', dropRate: 0.48, material: true },
                { id: 'infernal_ash', name: 'Infernal Ash', icon: '🔥', price: 100, rarity: 'common', dropRate: 0.42, material: true },
                { id: 'ancient_rune', name: 'Ancient Rune', icon: '📿', price: 250, rarity: 'uncommon', dropRate: 0.28, material: true },
                { id: 'nightbringer_gem', name: 'Nightbringer Gem', icon: '🌙', price: 750, rarity: 'legendary', dropRate: 0.10 }
            ],
            30: [
                { id: 'abyssal_pearl', name: 'Abyssal Pearl', icon: '🪨', price: 175, rarity: 'common', dropRate: 0.50, material: true },
                { id: 'void_shard', name: 'Void Shard', icon: '⬛', price: 150, rarity: 'common', dropRate: 0.45, material: true },
                { id: 'eternity_stone', name: 'Eternity Stone', icon: '⭐', price: 375, rarity: 'uncommon', dropRate: 0.30, material: true },
                { id: 'eternal_flame', name: 'Eternal Flame', icon: '🔥', price: 1000, rarity: 'legendary', dropRate: 0.12 }
            ],
            50: [
                { id: 'primordial_essence', name: 'Primordial Essence', icon: '🌀', price: 250, rarity: 'common', dropRate: 0.50, material: true },
                { id: 'cosmic_dust', name: 'Cosmic Dust', icon: '🌌', price: 225, rarity: 'common', dropRate: 0.48, material: true },
                { id: 'eldritch_core', name: 'Eldritch Core', icon: '👾', price: 500, rarity: 'uncommon', dropRate: 0.32, material: true },
                { id: 'infinite_crystal', name: 'Infinite Crystal', icon: '💎', price: 1500, rarity: 'legendary', dropRate: 0.15 }
            ],
            75: [
                { id: 'transcendent_shard', name: 'Transcendent Shard', icon: '✨', price: 375, rarity: 'common', dropRate: 0.52, material: true },
                { id: 'celestial_core', name: 'Celestial Core', icon: '⭐', price: 325, rarity: 'common', dropRate: 0.48, material: true },
                { id: 'omnipotent_essence', name: 'Omnipotent Essence', icon: '👁️', price: 750, rarity: 'uncommon', dropRate: 0.35, material: true },
                { id: 'divine_crown', name: 'Divine Crown', icon: '👑', price: 2500, rarity: 'legendary', dropRate: 0.18 }
            ],
            100: [
                { id: 'eternal_fragment', name: 'Eternal Fragment', icon: '⏮️', price: 500, rarity: 'common', dropRate: 0.50, material: true },
                { id: 'absolute_essence', name: 'Absolute Essence', icon: '🌟', price: 450, rarity: 'common', dropRate: 0.48, material: true },
                { id: 'ultimate_treasure', name: 'Ultimate Treasure', icon: '💰', price: 1250, rarity: 'uncommon', dropRate: 0.38, material: true },
                { id: 'infinity_crown', name: 'Infinity Crown', icon: '♾️', price: 5000, rarity: 'legendary', dropRate: 0.20 }
            ]
        };
        this.worlds = [
            { level: 1, name: 'Goblin Forest', enemyLevel: 1, difficulty: 'Easy', baseExp: 50 },
            { level: 5, name: 'Orc Stronghold', enemyLevel: 5, difficulty: 'Easy', baseExp: 100 },
            { level: 10, name: 'Shadow Crypt', enemyLevel: 10, difficulty: 'Medium', baseExp: 200 },
            { level: 20, name: "Dragon's Peak", enemyLevel: 20, difficulty: 'Medium', baseExp: 400 },
            { level: 30, name: 'Void Rift', enemyLevel: 30, difficulty: 'Hard', baseExp: 600 },
            { level: 50, name: 'Eldritch Realm', enemyLevel: 50, difficulty: 'Hard', baseExp: 1000 },
            { level: 75, name: 'Celestial Spire', enemyLevel: 75, difficulty: 'Very Hard', baseExp: 1500 },
            { level: 100, name: 'The Infinite Void', enemyLevel: 100, difficulty: 'Insane', baseExp: 2000 }
        ];
        this.bosses = [
            { worldLevel: 1, name: 'Forest Guardian', icon: '🌳', healthMult: 1.5, damageMult: 1.2, goldMin: 50, goldMax: 80, expReward: 150, killsRequired: 10, amulet: { id: 'amulet_forest', name: "Forest Amulet", icon: '🍃', description: "Nature's blessing enhances your healing", stats: { healBoost: 15 }, unique: true } },
            { worldLevel: 5, name: 'Orc Warlord', icon: '👹', healthMult: 1.8, damageMult: 1.5, goldMin: 120, goldMax: 180, expReward: 300, killsRequired: 25, amulet: { id: 'amulet_orc', name: "Warlord's Amulet", icon: '💀', description: 'Brutal strength flows through you', stats: { damageBoost: 5 }, unique: true } },
            { worldLevel: 10, name: 'Shadow Demon', icon: '👿', healthMult: 2.0, damageMult: 1.8, goldMin: 250, goldMax: 350, expReward: 500, killsRequired: 50, amulet: { id: 'amulet_shadow', name: "Shadow Amulet", icon: '🌑', description: 'Dark energy increases your mana', stats: { manaBoost: 25 }, unique: true } },
            { worldLevel: 20, name: 'Ancient Wyrm', icon: '🐉', healthMult: 2.5, damageMult: 2.2, goldMin: 500, goldMax: 700, expReward: 800, killsRequired: 100, amulet: { id: 'amulet_dragon', name: "Dragon Amulet", icon: '🐲', description: 'Dragon fire empowers your attacks', stats: { damageBoost: 10 }, unique: true } },
            { worldLevel: 30, name: 'Void Titan', icon: '⬛', healthMult: 3.0, damageMult: 2.8, goldMin: 900, goldMax: 1200, expReward: 1200, killsRequired: 200, amulet: { id: 'amulet_void', name: "Void Amulet", icon: '🌀', description: 'The void strengthens your defense', stats: { defenseBoost: 8 }, unique: true } },
            { worldLevel: 50, name: 'Eldritch Horror', icon: '👾', healthMult: 3.5, damageMult: 3.2, goldMin: 1500, goldMax: 2000, expReward: 1800, killsRequired: 350, amulet: { id: 'amulet_eldritch', name: "Eldritch Amulet", icon: '👁️', description: 'Ancient power boosts all healing', stats: { healBoost: 30 }, unique: true } },
            { worldLevel: 75, name: 'Celestial Overlord', icon: '⭐', healthMult: 4.0, damageMult: 3.8, goldMin: 2500, goldMax: 3200, expReward: 2500, killsRequired: 500, amulet: { id: 'amulet_celestial', name: "Celestial Amulet", icon: '✨', description: 'Divine light enhances your mana pool', stats: { manaBoost: 50 }, unique: true } },
            { worldLevel: 100, name: 'The Absolute', icon: '♾️', healthMult: 5.0, damageMult: 4.5, goldMin: 4000, goldMax: 5500, expReward: 3500, killsRequired: 750, amulet: { id: 'amulet_absolute', name: "Absolute Amulet", icon: '👑', description: 'Ultimate power surges through you', stats: { damageBoost: 15, defenseBoost: 10 }, unique: true } }
        ];
        this.gambleExclusiveAmulets = [
            { id: "gamble_amulet_luck", name: "Lucky Charm", icon: "🍀", price: 500, type: "amulet", description: "Gambler's favorite! +25% Gold, +10% Heal", stats: { goldBoost: 25, healBoost: 10 }, unique: true },
            { id: "gamble_amulet_berserk", name: "Berserker Amulet", icon: "💢", price: 800, type: "amulet", description: "All damage, no defense! +20 Dmg", stats: { damageBoost: 20 }, unique: true },
            { id: "gamble_amulet_tank", name: "Guardian Amulet", icon: "🛡️", price: 800, type: "amulet", description: "Immovable object! +15 Def, +50 HP", stats: { defenseBoost: 15, hpBoost: 50 }, unique: true },
            { id: "gamble_amulet_archmage", name: "Archmage Amulet", icon: "🔮", price: 1000, type: "amulet", description: "Supreme magical power! +50 Mana, +15% Heal", stats: { manaBoost: 50, healBoost: 15 }, unique: true },
            { id: "gamble_amulet_shadow", name: "Shadow Amulet", icon: "🌑", price: 1200, type: "amulet", description: "Strike from darkness! +18 Dmg, +25 Mana", stats: { damageBoost: 18, manaBoost: 25 }, unique: true },
            { id: "gamble_amulet_phoenix", name: "Phoenix Amulet", icon: "🔥", price: 1500, type: "amulet", description: "Rise from the ashes! +30% Heal, +40 HP", stats: { healBoost: 30, hpBoost: 40 }, unique: true },
            { id: "gamble_amulet_titan", name: "Titan Amulet", icon: "💪", price: 2000, type: "amulet", description: "Unstoppable force! +25 Dmg, +10 Def, +60 HP", stats: { damageBoost: 25, defenseBoost: 10, hpBoost: 60 }, unique: true },
            { id: "gamble_amulet_dragon", name: "Dragon Soul Amulet", icon: "🐲", price: 3000, type: "amulet", description: "Legendary power! +30 Dmg, +100 HP, +20% Gold", stats: { damageBoost: 30, hpBoost: 100, goldBoost: 20 }, unique: true }
        ];
        this.gambleExclusiveWeapons = [
            { id: "gamble_weapon_gold", name: "Golden Blade", icon: "🌟⚔️", price: 2000, type: "weapon", category: "melee", damage: 65, description: "A blade of pure gold! +65 Damage", stats: { damage: 65 }, unique: true, tier: 4 },
            { id: "gamble_weapon_shadow", name: "Shadow Dagger", icon: "🗡️", price: 2500, type: "weapon", category: "melee", damage: 80, description: "Strikes from the darkness! +80 Damage", stats: { damage: 80 }, unique: true, tier: 4 },
            { id: "gamble_weapon_storm", name: "Storm Bow", icon: "🌩️🏹", price: 3000, type: "weapon", category: "ranged", damage: 95, description: "Arrows crackle with lightning! +95 Damage", stats: { damage: 95 }, unique: true, tier: 5 },
            { id: "gamble_weapon_frost", name: "Frost Staff", icon: "❄️🔮", price: 3500, type: "weapon", category: "magic", damage: 110, description: "Freezes enemies solid! +110 Dmg, +20 Int", stats: { damage: 110, intelligence: 20 }, unique: true, tier: 5 },
            { id: "gamble_weapon_inferno", name: "Inferno Blade", icon: "🔥⚔️", price: 4500, type: "weapon", category: "melee", damage: 140, description: "Burns with eternal flame! +140 Damage", stats: { damage: 140 }, unique: true, tier: 5 },
            { id: "gamble_weapon_divine", name: "Divine Bow", icon: "✨🏹", price: 5500, type: "weapon", category: "ranged", damage: 175, description: "Blessed by the gods! +175 Damage", stats: { damage: 175 }, unique: true, tier: 5 }
        ];
        this.gambleMaterials = [
            { id: "gamble_mat_diamond", name: "Flawless Diamond", icon: "💎", price: 100, type: "loot", rarity: "uncommon", description: "A perfect gemstone" },
            { id: "gamble_mat_soul", name: "Crystallized Soul", icon: "✨", price: 150, type: "loot", rarity: "uncommon", description: "Contains immense power" },
            { id: "gamble_mat_star", name: "Star Fragment", icon: "⭐", price: 200, type: "loot", rarity: "rare", description: "A piece of a fallen star" },
            { id: "gamble_mat_dragon", name: "Dragon Heart", icon: "❤️", price: 500, type: "loot", rarity: "legendary", description: "Still beating with power" },
            { id: "gamble_mat_void", name: "Void Essence", icon: "🕳️", price: 750, type: "loot", rarity: "legendary", description: "Pure concentrated nothingness" }
        ];
        this.loadFromLocalStorage();
        this.recalculateStats();
    }

    getEquippedWeapon() { if (!this.player.equippedWeapon) return null; var self = this; return this.player.inventory.find(function(i) { return i.id === self.player.equippedWeapon; }) || null; }
    getEquippedArmor() { if (!this.player.equippedArmor) return null; var self = this; return this.player.inventory.find(function(i) { return i.id === self.player.equippedArmor; }) || null; }
    getEquippedAmulet() { if (!this.player.equippedAmulet) return null; var self = this; return this.player.inventory.find(function(i) { return i.id === self.player.equippedAmulet; }) || null; }

    getTierNumber(damage) { if (damage >= 120) return 5; if (damage >= 75) return 4; if (damage >= 35) return 3; if (damage >= 15) return 2; return 1; }
    getTierColor(tier) { if (tier === 5) return '#ffd700'; if (tier === 4) return '#a855f7'; if (tier === 3) return '#3b82f6'; if (tier === 2) return '#22c55e'; return '#ffffff'; }
    getTierName(tier) { if (tier === 5) return 'Legendary'; if (tier === 4) return 'Epic'; if (tier === 3) return 'Rare'; if (tier === 2) return 'Uncommon'; return 'Common'; }

    getSetBonus() {
        var weapon = this.getEquippedWeapon(); var armor = this.getEquippedArmor();
        if (!weapon || !armor) return 0;
        var wTier = weapon.tier || this.getTierNumber(weapon.damage || 0);
        var aTier = armor.tier || this.getTierNumber(armor.defense || 0);
        if (wTier === aTier) return wTier; return 0;
    }

    getTotalStats() {
        var weapon = this.getEquippedWeapon(); var armor = this.getEquippedArmor(); var amulet = this.getEquippedAmulet();
        var bonusDamage = 0, bonusIntelligence = 0, bonusDefense = 0, healBoost = 0, manaBoost = 0, goldBoost = 0, hpBoost = 0;
        if (weapon && weapon.stats) { bonusDamage += (weapon.stats.damage || 0); bonusIntelligence += (weapon.stats.intelligence || 0); }
        if (armor && armor.stats) { bonusDefense += (armor.stats.defense || 0); }
        if (amulet && amulet.stats) { bonusDamage += (amulet.stats.damageBoost || 0); bonusDefense += (amulet.stats.defenseBoost || 0); healBoost += (amulet.stats.healBoost || 0); manaBoost += (amulet.stats.manaBoost || 0); goldBoost += (amulet.stats.goldBoost || 0); hpBoost += (amulet.stats.hpBoost || 0); }
        var setBonus = this.getSetBonus(); if (setBonus > 0) { bonusDamage += setBonus * 2; bonusDefense += setBonus * 2; }
        return { damage: this.player.strength + bonusDamage, intelligence: this.player.intelligence + bonusIntelligence, defense: this.player.defense + bonusDefense, bonusDamage: bonusDamage, bonusIntelligence: bonusIntelligence, bonusDefense: bonusDefense, healBoost: healBoost, manaBoost: manaBoost, goldBoost: goldBoost, hpBoost: hpBoost, setBonus: setBonus };
    }

    recalculateStats() {
        var totals = this.getTotalStats();
        this.player.maxHealth = 150 + (this.player.level * 20) + (totals.defense * 5) + totals.hpBoost;
        this.player.health = Math.min(this.player.health, this.player.maxHealth);
        this.player.maxMana = 100 + (this.player.level * 15) + (totals.intelligence * 3) + totals.manaBoost;
        this.player.mana = Math.min(this.player.mana, this.player.maxMana);
    }

    buildShopInventory() {
        var meleeWeapons = [
            { id: "wooden_sword", name: "Wooden Sword", icon: "⚔️", price: 50, type: "weapon", category: "melee", damage: 8, description: "A basic wooden training sword", stats: { damage: 8 }, unique: true, tier: 1 },
            { id: "iron_sword", name: "Iron Sword", icon: "⚔️", price: 200, type: "weapon", category: "melee", damage: 18, description: "A reliable iron blade", stats: { damage: 18 }, unique: true, tier: 2 },
            { id: "steel_sword", name: "Steel Sword", icon: "⚔️", price: 500, type: "weapon", category: "melee", damage: 35, description: "Forged from pure steel", stats: { damage: 35 }, unique: true, tier: 3 },
            { id: "battle_axe", name: "Battle Axe", icon: "🪓", price: 900, type: "weapon", category: "melee", damage: 50, description: "A heavy two-handed axe", stats: { damage: 50 }, unique: true, tier: 3 },
            { id: "silver_sword", name: "Silver Sword", icon: "⚔️", price: 1500, type: "weapon", category: "melee", damage: 75, description: "Enchanted with silver magic", stats: { damage: 75 }, unique: true, tier: 4 },
            { id: "greatsword", name: "Greatsword", icon: "⚔️", price: 2500, type: "weapon", category: "melee", damage: 100, description: "An imposing two-handed blade", stats: { damage: 100 }, unique: true, tier: 4 },
            { id: "blessed_sword", name: "Blessed Sword", icon: "✨⚔️", price: 3500, type: "weapon", category: "melee", damage: 125, description: "Blessed by the ancient gods", stats: { damage: 125 }, unique: true, tier: 5 },
            { id: "obsidian_blade", name: "Obsidian Blade", icon: "⚫⚔️", price: 4500, type: "weapon", category: "melee", damage: 135, description: "Forged from volcanic obsidian", stats: { damage: 135 }, unique: true, tier: 5 },
            { id: "dragon_slayer_sword", name: "Dragon Slayer Sword", icon: "🐲⚔️", price: 5000, type: "weapon", category: "melee", damage: 150, description: "Legendary sword", stats: { damage: 150 }, unique: true, tier: 5 }
        ];
        var rangedWeapons = [
            { id: "wooden_bow", name: "Wooden Bow", icon: "🏹", price: 60, type: "weapon", category: "ranged", damage: 10, description: "A simple wooden bow", stats: { damage: 10 }, unique: true, tier: 1 },
            { id: "short_bow", name: "Short Bow", icon: "🏹", price: 220, type: "weapon", category: "ranged", damage: 20, description: "Compact and quick", stats: { damage: 20 }, unique: true, tier: 2 },
            { id: "longbow", name: "Longbow", icon: "🏹", price: 550, type: "weapon", category: "ranged", damage: 38, description: "Powerful bow", stats: { damage: 38 }, unique: true, tier: 3 },
            { id: "crossbow", name: "Crossbow", icon: "🎯", price: 950, type: "weapon", category: "ranged", damage: 65, description: "Mechanical bow", stats: { damage: 65 }, unique: true, tier: 3 },
            { id: "elven_bow", name: "Elven Bow", icon: "🏹", price: 1600, type: "weapon", category: "ranged", damage: 85, description: "Crafted by elves", stats: { damage: 85 }, unique: true, tier: 4 },
            { id: "heavy_crossbow", name: "Heavy Crossbow", icon: "🎯", price: 2700, type: "weapon", category: "ranged", damage: 110, description: "Devastating weapon", stats: { damage: 110 }, unique: true, tier: 4 },
            { id: "frost_bow", name: "Frost Bow", icon: "❄️🏹", price: 3700, type: "weapon", category: "ranged", damage: 130, description: "Imbued with ice", stats: { damage: 130 }, unique: true, tier: 5 },
            { id: "celestial_longbow", name: "Celestial Longbow", icon: "⭐🏹", price: 5200, type: "weapon", category: "ranged", damage: 170, description: "Divine bow", stats: { damage: 170 }, unique: true, tier: 5 }
        ];
        var magicWeapons = [
            { id: "wooden_staff", name: "Wooden Staff", icon: "🪵🔮", price: 70, type: "weapon", category: "magic", damage: 12, description: "Basic staff", stats: { damage: 12, intelligence: 3 }, unique: true, tier: 1 },
            { id: "mana_wand", name: "Mana Wand", icon: "✨🪄", price: 250, type: "weapon", category: "magic", damage: 22, description: "Channels mana", stats: { damage: 22, intelligence: 5 }, unique: true, tier: 2 },
            { id: "crystal_staff", name: "Crystal Staff", icon: "💎🔮", price: 600, type: "weapon", category: "magic", damage: 40, description: "Amplifies power", stats: { damage: 40, intelligence: 8 }, unique: true, tier: 3 },
            { id: "fire_scepter", name: "Fire Scepter", icon: "🔥🔱", price: 1000, type: "weapon", category: "magic", damage: 60, description: "Channels flame", stats: { damage: 60, intelligence: 10 }, unique: true, tier: 3 },
            { id: "arcane_staff", name: "Arcane Staff", icon: "🌀🔮", price: 1800, type: "weapon", category: "magic", damage: 88, description: "Raw arcane energy", stats: { damage: 88, intelligence: 15 }, unique: true, tier: 4 },
            { id: "shadow_wand", name: "Shadow Wand", icon: "🌑🪄", price: 2900, type: "weapon", category: "magic", damage: 115, description: "Dark magic", stats: { damage: 115, intelligence: 18 }, unique: true, tier: 4 },
            { id: "divine_staff", name: "Divine Staff", icon: "☀️🔮", price: 4000, type: "weapon", category: "magic", damage: 138, description: "Divine light", stats: { damage: 138, intelligence: 22 }, unique: true, tier: 5 },
            { id: "celestial_orb", name: "Celestial Orb", icon: "⭐💎", price: 5500, type: "weapon", category: "magic", damage: 150, description: "Mystical orb", stats: { damage: 150, intelligence: 25 }, unique: true, tier: 5 }
        ];
        var armors = [
            { id: "leather_armor", name: "Leather Armor", icon: "🛡️", price: 150, type: "armor", defense: 10, description: "Light protection", stats: { defense: 10 }, unique: true, tier: 1 },
            { id: "iron_armor", name: "Iron Armor", icon: "🛡️", price: 500, type: "armor", defense: 25, description: "Iron protection", stats: { defense: 25 }, unique: true, tier: 2 },
            { id: "steel_armor", name: "Steel Armor", icon: "🛡️", price: 1200, type: "armor", defense: 40, description: "Steel plating", stats: { defense: 40 }, unique: true, tier: 3 },
            { id: "dragon_armor", name: "Dragon Scale Armor", icon: "🐲🛡️", price: 3000, type: "armor", defense: 65, description: "Dragon scales", stats: { defense: 65 }, unique: true, tier: 4 },
            { id: "divine_armor", name: "Divine Armor", icon: "✨🛡️", price: 6000, type: "armor", defense: 100, description: "Blessed armor", stats: { defense: 100 }, unique: true, tier: 5 }
        ];
        var consumables = [
            { id: "health_potion", name: "Health Potion", icon: "🧪", price: 30, type: "consumable", heal: 50, description: "Restore 50 HP", stats: { heal: 50 } },
            { id: "mana_potion", name: "Mana Potion", icon: "💙", price: 35, type: "consumable", mana: 40, description: "Restore 40 Mana", stats: { mana: 40 } },
            { id: "greater_health_potion", name: "Greater Health Potion", icon: "🧪", price: 75, type: "consumable", heal: 120, description: "Restore 120 HP", stats: { heal: 120 } },
            { id: "greater_mana_potion", name: "Greater Mana Potion", icon: "💙", price: 85, type: "consumable", mana: 100, description: "Restore 100 Mana", stats: { mana: 100 } }
        ];
        var specialItems = [
            { id: "special_sword_10", name: "Vampiric Blade", icon: "🩸⚔️", price: 3000, type: "weapon", category: "melee", damage: 55, description: "Heals you on kill", stats: { damage: 55 }, unique: true, tier: 4, requirement: { type: 'kills', amount: 25 } },
            { id: "special_bow_25", name: "Thunder Bow", icon: "⚡🏹", price: 3500, type: "weapon", category: "ranged", damage: 70, description: "Chance to stun", stats: { damage: 70 }, unique: true, tier: 4, requirement: { type: 'kills', amount: 50 } },
            { id: "special_staff_50", name: "Inferno Staff", icon: "🔥🔮", price: 4500, type: "weapon", category: "magic", damage: 90, description: "Bonus fire damage", stats: { damage: 90, intelligence: 12 }, unique: true, tier: 4, requirement: { type: 'kills', amount: 100 } },
            { id: "special_armor_75", name: "Phoenix Armor", icon: "🔥🛡️", price: 5000, type: "armor", defense: 50, description: "Revive once per battle", stats: { defense: 50 }, unique: true, tier: 4, requirement: { type: 'kills', amount: 200 } },
            { id: "special_amulet_100", name: "Slayer's Mark", icon: "💀📿", price: 6000, type: "amulet", description: "Power grows with kills", stats: { damageBoost: 10, goldBoost: 15 }, unique: true, requirement: { type: 'kills', amount: 350 } },
            { id: "special_sword_boss1", name: "Guardian's Blade", icon: "🌳⚔️", price: 2000, type: "weapon", category: "melee", damage: 45, description: "Forest Guardian's bark", stats: { damage: 45, defenseBoost: 5 }, unique: true, tier: 3, requirement: { type: 'boss', worldLevel: 1 } },
            { id: "special_bow_boss5", name: "Warlord's Crossbow", icon: "👹🎯", price: 3500, type: "weapon", category: "ranged", damage: 80, description: "Orc Warlord's arsenal", stats: { damage: 80, damageBoost: 5 }, unique: true, tier: 4, requirement: { type: 'boss', worldLevel: 5 } },
            { id: "special_staff_boss10", name: "Demonheart Staff", icon: "👿🔮", price: 5000, type: "weapon", category: "magic", damage: 100, description: "Shadow Demon's energy", stats: { damage: 100, intelligence: 18, manaBoost: 20 }, unique: true, tier: 5, requirement: { type: 'boss', worldLevel: 10 } },
            { id: "special_armor_boss20", name: "Wyrm Scale Armor", icon: "🐉🛡️", price: 6000, type: "armor", defense: 70, description: "Ancient Wyrm scales", stats: { defense: 70, hpBoost: 50 }, unique: true, tier: 4, requirement: { type: 'boss', worldLevel: 20 } },
            { id: "special_amulet_boss30", name: "Titan's Essence", icon: "⬛📿", price: 7000, type: "amulet", description: "Void Titan's power", stats: { damageBoost: 12, defenseBoost: 8, hpBoost: 60 }, unique: true, requirement: { type: 'boss', worldLevel: 30 } },
            { id: "special_sword_boss50", name: "Eldritch Blade", icon: "👾⚔️", price: 9000, type: "weapon", category: "melee", damage: 160, description: "Reality bends", stats: { damage: 160, healBoost: 20 }, unique: true, tier: 5, requirement: { type: 'boss', worldLevel: 50 } },
            { id: "special_bow_boss75", name: "Celestial Longbow", icon: "⭐🏹", price: 11000, type: "weapon", category: "ranged", damage: 190, description: "Celestial Overlord", stats: { damage: 190, manaBoost: 40 }, unique: true, tier: 5, requirement: { type: 'boss', worldLevel: 75 } },
            { id: "special_armor_boss100", name: "Absolute Plate", icon: "♾️🛡️", price: 15000, type: "armor", defense: 120, description: "The Absolute itself", stats: { defense: 120, hpBoost: 100, healBoost: 25 }, unique: true, tier: 5, requirement: { type: 'boss', worldLevel: 100 } }
        ];
        return meleeWeapons.concat(rangedWeapons).concat(magicWeapons).concat(armors).concat(consumables).concat(specialItems);
    }

    buildAmuletShopInventory() {
        return [
            { id: "shop_amulet_1a", name: "Amulet of Vitality", icon: "❤️", price: 200, type: "amulet", description: "+30 Max HP", stats: { hpBoost: 30 }, unique: true },
            { id: "shop_amulet_1b", name: "Amulet of Greed", icon: "🪙", price: 250, type: "amulet", description: "+20% Gold", stats: { goldBoost: 20 }, unique: true },
            { id: "shop_amulet_5a", name: "Amulet of the Mage", icon: "💎", price: 500, type: "amulet", description: "+30 Max Mana", stats: { manaBoost: 30 }, unique: true },
            { id: "shop_amulet_5b", name: "Warrior's Pendant", icon: "⚡", price: 450, type: "amulet", description: "+3 Dmg, +3 Def", stats: { damageBoost: 3, defenseBoost: 3 }, unique: true },
            { id: "shop_amulet_10a", name: "Amulet of Regeneration", icon: "💚", price: 800, type: "amulet", description: "+20% Healing", stats: { healBoost: 20 }, unique: true },
            { id: "shop_amulet_10b", name: "Balanced Pendant", icon: "☯️", price: 900, type: "amulet", description: "+15 HP, +15 Mana, +8% Gold", stats: { hpBoost: 15, manaBoost: 15, goldBoost: 8 }, unique: true },
            { id: "shop_amulet_20a", name: "Dragonkin Amulet", icon: "🐲", price: 1500, type: "amulet", description: "+8 Damage", stats: { damageBoost: 8 }, unique: true },
            { id: "shop_amulet_20b", name: "Guardian's Shield", icon: "🛡️", price: 1400, type: "amulet", description: "+8 Defense", stats: { defenseBoost: 8 }, unique: true },
            { id: "shop_amulet_30a", name: "Soul Amulet", icon: "💀", price: 2200, type: "amulet", description: "+5 Dmg, +15% Heal", stats: { damageBoost: 5, healBoost: 15 }, unique: true },
            { id: "shop_amulet_30b", name: "Midas Touch", icon: "👑", price: 2000, type: "amulet", description: "+35% Gold", stats: { goldBoost: 35 }, unique: true },
            { id: "shop_amulet_50a", name: "Eldritch Pendant", icon: "👁️", price: 3500, type: "amulet", description: "+6 Dmg, +40 HP, +30 Mana", stats: { damageBoost: 6, hpBoost: 40, manaBoost: 30 }, unique: true },
            { id: "shop_amulet_50b", name: "Healer's Grace", icon: "💖", price: 3200, type: "amulet", description: "+35% Healing", stats: { healBoost: 35 }, unique: true },
            { id: "shop_amulet_75a", name: "Celestial Charm", icon: "⭐", price: 5000, type: "amulet", description: "+7 Dmg, +7 Def, +50 HP, +40 Mana", stats: { damageBoost: 7, defenseBoost: 7, hpBoost: 50, manaBoost: 40 }, unique: true },
            { id: "shop_amulet_75b", name: "Fortune's Favor", icon: "🍀", price: 4800, type: "amulet", description: "+50% Gold, +25 Mana", stats: { goldBoost: 50, manaBoost: 25 }, unique: true },
            { id: "shop_amulet_100a", name: "Infinity Pendant", icon: "♾️", price: 8000, type: "amulet", description: "+12 Dmg, +8 Def, +80 HP, +60 Mana", stats: { damageBoost: 12, defenseBoost: 8, hpBoost: 80, manaBoost: 60 }, unique: true },
            { id: "shop_amulet_100b", name: "Transcendent Soul", icon: "🌟", price: 7500, type: "amulet", description: "+60% Gold, +40% Heal", stats: { goldBoost: 60, healBoost: 40 }, unique: true }
        ];
    }

    isSpecialItemUnlocked(item) { if (!item.requirement) return true; if (item.requirement.type === 'kills') return this.player.totalKills >= item.requirement.amount; if (item.requirement.type === 'boss') return this.player.bossDefeats && this.player.bossDefeats[item.requirement.worldLevel]; return false; }
    addMaterial(item) { if (!item.material) return; if (!this.player.materials[item.id]) this.player.materials[item.id] = 0; this.player.materials[item.id]++; }

    upgradeItem(itemId) {
        var item = null; for (var i = 0; i < this.player.inventory.length; i++) { if (this.player.inventory[i].id === itemId) { item = this.player.inventory[i]; break; } }
        if (!item) return { success: false, message: 'Item not found!' };
        if (!item.tier || item.tier >= 5) return { success: false, message: 'Already max tier!' };
        var cost = item.tier * 500; if (this.player.gold < cost) return { success: false, message: 'Need ' + cost + ' gold!' };
        this.player.gold -= cost;
        if (item.stats) { if (item.stats.damage) item.stats.damage = Math.floor(item.stats.damage * 1.3); if (item.stats.defense) item.stats.defense = Math.floor(item.stats.defense * 1.3); if (item.stats.intelligence) item.stats.intelligence = Math.floor(item.stats.intelligence * 1.3); }
        if (item.damage) item.damage = Math.floor(item.damage * 1.3); if (item.defense) item.defense = Math.floor(item.defense * 1.3);
        item.tier = Math.min(5, (item.tier || 1) + 1); item.name = item.name.replace(/ \+$/, '') + ' +'; this.saveToLocalStorage();
        return { success: true, message: 'Upgraded to tier ' + item.tier + '!' };
    }

    gamble(amount) {
        if (this.player.gold < amount) return { success: false, message: 'Not enough gold!' };
        this.player.gold -= amount;
        var roll = Math.random();
        var reward = null;
        var message = '';
        var tier = amount >= 1000 ? 'high' : amount >= 500 ? 'medium' : amount >= 200 ? 'low' : 'tiny';

        if (roll < 0.03) {
            if (tier === 'high') { var pool = this.gambleExclusiveWeapons.concat(this.gambleExclusiveAmulets.slice(4)); reward = pool[Math.floor(Math.random() * pool.length)]; }
            else if (tier === 'medium') { var pool = this.gambleExclusiveAmulets.slice(2, 6).concat(this.gambleExclusiveWeapons.slice(0, 3)); reward = pool[Math.floor(Math.random() * pool.length)]; }
            else if (tier === 'low') { var pool = this.gambleExclusiveAmulets.slice(0, 4).concat(this.gambleExclusiveWeapons.slice(0, 1)); reward = pool[Math.floor(Math.random() * pool.length)]; }
            else { var pool = this.gambleExclusiveAmulets.slice(0, 2); reward = pool[Math.floor(Math.random() * pool.length)]; }
            message = '🎉 JACKPOT! You won: ' + reward.icon + ' ' + reward.name + '! (' + reward.description + ')';
        } else if (roll < 0.10) {
            if (tier === 'high' || tier === 'medium') { reward = this.gambleExclusiveAmulets[Math.floor(Math.random() * this.gambleExclusiveAmulets.length)]; }
            else if (tier === 'low') { reward = this.gambleExclusiveAmulets[Math.floor(Math.random() * 4)]; }
            else { reward = this.gambleMaterials[Math.floor(Math.random() * 3)]; }
            message = '🎊 Amazing! You won: ' + reward.icon + ' ' + reward.name + '! (' + reward.description + ')';
        } else if (roll < 0.25) {
            reward = this.gambleMaterials[Math.floor(Math.random() * this.gambleMaterials.length)];
            message = '👍 Nice! You found: ' + reward.icon + ' ' + reward.name + '!';
        } else if (roll < 0.50) {
            var refund = Math.floor(amount * 0.75);
            this.player.gold += refund;
            this.saveToLocalStorage();
            return { success: true, message: '😐 Close one! Got back ' + refund + ' gold (75%).' };
        } else {
            this.saveToLocalStorage();
            return { success: true, message: '😢 Nothing! Lost ' + amount + ' gold. Better luck next time!' };
        }

        if (reward) {
            var existing = this.player.inventory.find(function(i) { return i.id === reward.id; });
            if (existing && reward.unique) {
                var altRefund = Math.floor(amount * 1.5);
                this.player.gold += altRefund;
                this.saveToLocalStorage();
                return { success: true, message: '🎰 You already own ' + reward.name + '! Refunded ' + altRefund + ' gold instead.' };
            }
            this.addToInventory(reward);
        }
        this.saveToLocalStorage();
        return { success: true, message: message };
    }

    loadFromLocalStorage() {
        var saved = localStorage.getItem('rpgGameState');
        if (saved) {
            var data = JSON.parse(saved);
            // Only load player progress, NOT shop inventories (those are always fresh)
            if (data.player) {
                this.player.level = data.player.level || this.defaultPlayer.level;
                this.player.exp = data.player.exp || 0;
                this.player.expToNextLevel = data.player.expToNextLevel || this.defaultPlayer.expToNextLevel;
                this.player.health = data.player.health || this.defaultPlayer.health;
                this.player.maxHealth = data.player.maxHealth || this.defaultPlayer.maxHealth;
                this.player.mana = data.player.mana || this.defaultPlayer.mana;
                this.player.maxMana = data.player.maxMana || this.defaultPlayer.maxMana;
                this.player.gold = data.player.gold || this.defaultPlayer.gold;
                this.player.strength = data.player.strength || this.defaultPlayer.strength;
                this.player.intelligence = data.player.intelligence || this.defaultPlayer.intelligence;
                this.player.defense = data.player.defense || this.defaultPlayer.defense;
                this.player.speed = data.player.speed || this.defaultPlayer.speed;
                this.player.inventory = data.player.inventory || [];
                this.player.equippedWeapon = data.player.equippedWeapon || null;
                this.player.equippedArmor = data.player.equippedArmor || null;
                this.player.equippedAmulet = data.player.equippedAmulet || null;
                this.player.bossDefeats = data.player.bossDefeats || {};
                this.player.totalKills = data.player.totalKills || 0;
                this.player.materials = data.player.materials || {};
                this.player.name = data.player.name || this.defaultPlayer.name;
                // Fix: ensure exp doesn't exceed expToNextLevel without leveling
                while (this.player.exp >= this.player.expToNextLevel) {
                    this.player.level++;
                    this.player.exp -= this.player.expToNextLevel;
                    this.player.expToNextLevel = Math.floor(this.player.expToNextLevel * 1.1);
                    this.player.strength += 3;
                    this.player.intelligence += 2;
                    this.player.defense += 2;
                }
            }
        }
    }

    saveToLocalStorage() { localStorage.setItem('rpgGameState', JSON.stringify({ player: this.player })); }

    resetGame() {
        localStorage.removeItem('rpgGameState');
        this.player = JSON.parse(JSON.stringify(this.defaultPlayer));
        this.player.inventory = []; this.player.bossDefeats = {}; this.player.totalKills = 0; this.player.materials = {};
        this.shops = this.buildShopInventory(); this.specialShop = this.buildAmuletShopInventory();
        this.recalculateStats();
    }

    buyItem(itemId, isSpecial) {
        isSpecial = isSpecial || false; var shopList = isSpecial ? this.specialShop : this.shops;
        var item = null; for (var i = 0; i < shopList.length; i++) { if (shopList[i].id === itemId) { item = shopList[i]; break; } }
        if (!item) return { success: false, message: 'Item not found!' };
        if (this.player.gold < item.price) return { success: false, message: 'Not enough gold!' };
        if (item.requirement && !this.isSpecialItemUnlocked(item)) return { success: false, message: 'Requirements not met!' };
        if (item.unique) { for (var j = 0; j < this.player.inventory.length; j++) { if (this.player.inventory[j].id === itemId) return { success: false, message: 'Already owned!' }; } }
        this.player.gold -= item.price; this.addToInventory(item);
        if (item.unique) { if (isSpecial) { this.specialShop = this.specialShop.filter(function(i) { return i.id !== itemId; }); } else { this.shops = this.shops.filter(function(i) { return i.id !== itemId; }); } }
        this.saveToLocalStorage(); return { success: true, message: item.name + ' purchased!' };
    }

    addToInventory(item) {
        for (var i = 0; i < this.player.inventory.length; i++) { if (this.player.inventory[i].id === item.id) { if (!item.unique) { this.player.inventory[i].quantity = (this.player.inventory[i].quantity || 1) + 1; } return; } }
        this.player.inventory.push({ id: item.id, name: item.name, icon: item.icon, price: item.price, type: item.type, category: item.category, damage: item.damage, defense: item.defense, description: item.description, stats: item.stats ? JSON.parse(JSON.stringify(item.stats)) : null, rarity: item.rarity, unique: item.unique, tier: item.tier, quantity: 1 });
    }

    addDropToInventory(item) {
        for (var i = 0; i < this.player.inventory.length; i++) { if (this.player.inventory[i].id === item.id) { this.player.inventory[i].quantity = (this.player.inventory[i].quantity || 1) + 1; return; } }
        this.player.inventory.push({ id: item.id, name: item.name, icon: item.icon, price: item.price, type: 'loot', rarity: item.rarity, description: item.description || '', quantity: 1 });
    }

    addKill() { this.player.totalKills++; this.saveToLocalStorage(); }

    gainExp(amount) {
        this.player.exp += amount;
        while (this.player.exp >= this.player.expToNextLevel) {
            this.player.level++;
            this.player.exp -= this.player.expToNextLevel;
            this.player.expToNextLevel = Math.floor(this.player.expToNextLevel * 1.1);
            this.player.strength += 3;
            this.player.intelligence += 2;
            this.player.defense += 2;
        }
        this.recalculateStats();
        this.player.health = this.player.maxHealth;
        this.player.mana = this.player.maxMana;
        this.saveToLocalStorage();
    }

    gainGold(amount) { var t = this.getTotalStats(); var b = Math.floor(amount * (t.goldBoost / 100)); this.player.gold += amount + b; this.saveToLocalStorage(); return b; }
}

var gameState = new GameState();