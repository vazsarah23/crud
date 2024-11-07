import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });

    await db.exec(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    dept TEXT DEFAULT 'General'
    
    )`);
    return db;
};


// isDeleted INTEGER DEFAULT 0