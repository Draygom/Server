const database = require("./database.js");

async function runMigrations() {
    console.log("Running migrations...");
    try {
        await database.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        address VARCHAR(255) DEFAULT '',
        type VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log("Migrations completed successfully.");
    } catch (error) {
        console.error("Migration failed:", error);
    }
}

module.exports = runMigrations;
