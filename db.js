const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco
const dbPath = path.join(__dirname, 'data.db');

// Cria / abre o banco
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao abrir o banco:", err);
    } else {
        console.log("Banco SQLite conectado com sucesso!");
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS devices (
            id TEXT PRIMARY KEY,
            name TEXT,
            status TEXT,
            last_value REAL,
            updated_at TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            device_id TEXT,
            value REAL,
            timestamp TEXT
        )
    `);
});

// Funções
module.exports = {
    saveDevice(device) {
        db.run(`
            INSERT INTO devices (id, name, status, last_value, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                status = excluded.status,
                last_value = excluded.last_value,
                updated_at = excluded.updated_at
        `,
            [device.id, device.name, device.status, device.last_value, device.updated_at]
        );
    },

    saveLog(deviceId, value) {
        db.run(`
            INSERT INTO logs (device_id, value, timestamp)
            VALUES (?, ?, ?)
        `,
            [deviceId, value, new Date().toISOString()]
        );
    },

    getDevices(callback) {
        db.all(`SELECT * FROM devices`, callback);
    }
};
