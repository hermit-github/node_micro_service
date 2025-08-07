import dotenv from "dotenv";
dotenv.config();

export const appEnv = {
    port:process.env.PORT,
    databaseUrl:process.env.DATABASE_URL
}