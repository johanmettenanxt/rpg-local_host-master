const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const globalBossMaxHP = 1000000;
const bossFile = path.join(__dirname, "data", "globalboss.json");

function loadBossHP() {
    try {
        if (fs.existsSync(bossFile)) {
            const data = JSON.parse(fs.readFileSync(bossFile));
            return data.hp || globalBossMaxHP;
        }
    } catch (e) {}
    return globalBossMaxHP;
}

function saveBossHP(hp) {
    try {
        if (!fs.existsSync(path.join(__dirname, "data"))) fs.mkdirSync(path.join(__dirname, "data"));
        fs.writeFileSync(bossFile, JSON.stringify({ hp: hp }));
    } catch (e) {}
}

let globalBossHP = loadBossHP();

app.get("/api/globalboss", (req, res) => {
    res.json({ hp: globalBossHP, maxHp: globalBossMaxHP });
});

app.post("/api/globalboss/damage", (req, res) => {
    const { damage } = req.body;
    if (damage && damage > 0) {
        globalBossHP = Math.max(0, globalBossHP - damage);
        if (globalBossHP <= 0) globalBossHP = globalBossMaxHP;
        saveBossHP(globalBossHP);
    }
    res.json({ hp: globalBossHP });
});

app.post("/api/globalboss/reset", (req, res) => {
    globalBossHP = globalBossMaxHP;
    saveBossHP(globalBossHP);
    res.json({ hp: globalBossHP });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));