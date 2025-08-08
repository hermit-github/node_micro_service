import { InferInsertModel, InferSelectModel, relations, sql } from "drizzle-orm";
import { pgTable, uuid, timestamp,integer,numeric, varchar } from "drizzle-orm/pg-core";

export const cart = pgTable("carts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  customerId: uuid("customerId").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof cart>;
export type NewCart = InferInsertModel<typeof cart>;

export const cartLineItem = pgTable("cart_line_items", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  productId:uuid("productId").notNull(),
  cartId:uuid("cartId").references(() => cart.id,{onDelete:"cascade"}),
  itemName:varchar("itemName").notNull(),
  variant:varchar("variant"),
  quantity:integer("quantity").notNull(),
  price:numeric("price"),
  createdAt:timestamp("created_at").notNull().defaultNow(),
  updatedAt:timestamp("updated_at").notNull().defaultNow(),
});

export type CartLineItem = InferSelectModel<typeof cartLineItem>;
export type NewCartLineItem = InferInsertModel<typeof cartLineItem>;

export const cartRelations = relations(cart,({many}) => ({
    lineItems:many(cartLineItem)
}));

export const lineItemsRelations = relations(cartLineItem,({one}) => ({
    cart:one(cart,{
        fields:[cartLineItem.cartId],
        references:[cart.id]
    })
}))