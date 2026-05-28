const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const worlds = [
    { id: 1, name: "Forest", enemies: ["goblin","wolf","slime","bandit","spider","orc","forest_mage","boar","ent","shadow_hound"] },
    { id: 2, name: "Desert", enemies: ["scorpion","bandit","sand_worm","mummy","desert_witch","raider","cobra","dune_guard","scarab","fire_spirit"] },
    { id: 3, name: "Dungeon", enemies: ["skeleton","dark_mage","zombie","cursed_knight","ghost","demon","necromancer","stone_golem","wraith","lich"] }
];

const enemies = {
    goblin: { hp: 30, attack: 5, loot: ["potion"] }, wolf: { hp: 35, attack: 6, loot: [] },
    slime: { hp: 20, attack: 3, loot: ["potion"] }, bandit: { hp: 50, attack: 10, loot: ["gold"] },
    spider: { hp: 40, attack: 8, loot: [] }, orc: { hp: 80, attack: 12, loot: ["weapon"] },
    forest_mage: { hp: 60, attack: 15, loot: ["mana_potion"] }, boar: { hp: 70, attack: 10, loot: [] },
    ent: { hp: 120, attack: 14, loot: ["armor"] }, shadow_hound: { hp: 90, attack: 16, loot: ["weapon"] },
    scorpion: { hp: 45, attack: 9, loot: [] }, sand_worm: { hp: 100, attack: 13, loot: ["gold"] },
    mummy: { hp: 75, attack: 11, loot: ["armor"] }, desert_witch: { hp: 65, attack: 16, loot: ["mana_potion"] },
    raider: { hp: 55, attack: 12, loot: ["gold"] }, cobra: { hp: 40, attack: 10, loot: ["potion"] },
    dune_guard: { hp: 85, attack: 14, loot: ["weapon"] }, scarab: { hp: 35, attack: 7, loot: [] },
    fire_spirit: { hp: 70, attack: 18, loot: ["mana_potion"] }, skeleton: { hp: 60, attack: 12, loot: ["gold"] },
    dark_mage: { hp: 55, attack: 20, loot: ["mana_potion"] }, zombie: { hp: 80, attack: 10, loot: [] },
    cursed_knight: { hp: 110, attack: 16, loot: ["weapon"] }, ghost: { hp: 45, attack: 14, loot: [] },
    demon: { hp: 120, attack: 22, loot: ["weapon"] }, necromancer: { hp: 70, attack: 25, loot: ["mana_potion"] },
    stone_golem: { hp: 150, attack: 15, loot: ["armor"] }, wraith: { hp: 95, attack: 19, loot: ["gold"] },
    lich: { hp: 130, attack: 28, loot: ["weapon","mana_potion"] }
};

const saveFile = path.join(__dirname, "data/save.json");

app.get("/api/worlds", (req, res) => res.json(worlds));
app.get("/api/world/:id/enemies", (req, res) => {
    const world = worlds.find(w => w.id == req.params.id);
    if (!world) return res.status(404).json({ error: "world not found" });
    res.json(world.enemies.map(e => ({ name: e, ...enemies[e] })));
});
app.get("/api/save", (req, res) => {
    if (!fs.existsSync(saveFile)) return res.json(null);
    res.json(JSON.parse(fs.readFileSync(saveFile)));
});
app.post("/api/save", (req, res) => {
    fs.writeFileSync(saveFile, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
});

app.listen(3000, () => console.log("http://localhost:3000"));