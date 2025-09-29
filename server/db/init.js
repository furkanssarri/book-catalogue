const fs = require("node:fs");
const path = require("node:path");
const pool = require("./pool.js");

async function initDB() {
  try {
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
    await pool.query(schema);
    console.log("Schema created.");

    if (process.env.NODE_ENV !== "production") {
      const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf-8");
      await pool.query(seed);
      console.log("Seed data inserted to the db successfully");
    } else {
      console.log("NODE_ENV is production, skipping seeding...");
    }
  } catch (err) {
    console.error("Error initializing schema: ", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

initDB();
