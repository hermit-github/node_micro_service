import { Pool } from "pg";
import { appEnv } from "../config";
import {drizzle,NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "./schema"

const pool = new Pool({
    connectionString:appEnv.databaseUrl
});

export const DB:NodePgDatabase<typeof schema> = drizzle(pool,{schema})