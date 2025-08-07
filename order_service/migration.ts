import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";


async function runMigrations(){
    try {
        console.log("running migrations....");
        const pool = new Pool({connectionString:"postgresql://order_db_user:order_db_password@localhost:5434/order_db?schema=public"});
        const db = drizzle(pool);
        await migrate(db,{migrationsFolder:"./src/db/migrations"});
        console.log("ran all migrations");
        pool.end();
    } catch (error) {
        console.error("migration error",error);
    }
}

runMigrations();