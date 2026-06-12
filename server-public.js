const express = require("express");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const db = new Database(path.join(dataDir, "game.db"));
db.pragma("journal_mode = WAL");
db.exec(`
    CREATE TABLE IF NOT EXISTS saves (
                                         username TEXT PRIMARY KEY,
                                         data TEXT NOT NULL,
                                         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS globalboss (
                                              id INTEGER PRIMARY KEY DEFAULT 1,
                                              hp INTEGER NOT NULL DEFAULT 1000000,
                                              maxHp INTEGER NOT NULL DEFAULT 1000000
    );
    INSERT OR IGNORE INTO globalboss (id, hp, maxHp) VALUES (1, 1000000, 1000000);
`);

const globalBossMaxHP = 1000000;

function getGlobalBossHP() {
    const row = db.prepare("SELECT hp FROM globalboss WHERE id = 1").get();
    return row ? row.hp : globalBossMaxHP;
}

function setGlobalBossHP(hp) {
    db.prepare("UPDATE globalboss SET hp = ? WHERE id = 1").run(hp);
}

app.post("/api/save", (req, res) => {
    const { username, data } = req.body;
    if (!username || !data) return res.status(400).json({ error: "Missing username or data" });
    db.prepare("INSERT OR REPLACE INTO saves (username, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)").run(username, JSON.stringify(data));
    res.json({ ok: true });
});

app.get("/api/load/:username", (req, res) => {
    const row = db.prepare("SELECT data FROM saves WHERE username = ?").get(req.params.username);
    if (!row) return res.json(null);
    res.json(JSON.parse(row.data));
});

app.get("/api/saves", (req, res) => {
    const rows = db.prepare("SELECT username, updated_at FROM saves ORDER BY updated_at DESC").all();
    res.json(rows);
});

app.get("/api/saves/:username", (req, res) => {
    const row = db.prepare("SELECT data FROM saves WHERE username = ?").get(req.params.username);
    if (!row) return res.json(null);
    res.json(JSON.parse(row.data));
});

app.post("/api/saves/:username", (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Missing data" });
    db.prepare("UPDATE saves SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE username = ?").run(JSON.stringify(data), req.params.username);
    res.json({ ok: true });
});

app.get("/api/globalboss", (req, res) => {
    res.json({ hp: getGlobalBossHP(), maxHp: globalBossMaxHP });
});

app.post("/api/globalboss/damage", (req, res) => {
    const { damage } = req.body;
    if (damage && damage > 0) {
        let hp = getGlobalBossHP();
        hp = Math.max(0, hp - damage);
        if (hp <= 0) hp = globalBossMaxHP;
        setGlobalBossHP(hp);
    }
    res.json({ hp: getGlobalBossHP() });
});

app.post("/api/globalboss/reset", (req, res) => {
    setGlobalBossHP(globalBossMaxHP);
    res.json({ hp: globalBossMaxHP });
});
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));