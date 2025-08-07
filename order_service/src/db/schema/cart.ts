import { InferSelectModel, sql } from "drizzle-orm";
import {  } from "drizzle-orm/gel-core";
import { pgTable,uuid,timestamp } from "drizzle-orm/pg-core";


export const cart = pgTable("carts",{
    id:uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    customerId:uuid("customerId").notNull().unique(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp("updated_at").notNull().defaultNow()
})

export type Cart = InferSelectModel<typeof cart>