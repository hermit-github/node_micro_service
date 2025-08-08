import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import {
  Cart,
  cart,
  cartLineItem,
  CartLineItem,
  NewCartLineItem,
} from "../db/schema";
import { logger, NotFoundError } from "../utils";

export type CartRepositoryType = {
  createCart: (
    customerId: string,
    lineItem: NewCartLineItem
  ) => Promise<string>;
  findCart: (id: string) => Promise<Cart>;
  updateCart: (id: string, quantity: number) => Promise<CartLineItem>;
  deleteCart: (id: string) => Promise<boolean>;
  clearCartData: (id: string) => Promise<boolean>;
};

const createCart = async (
  customerId: string,
  { itemName, price, productId, quantity, variant }: NewCartLineItem
) => {
  const result = await DB.insert(cart)
    .values({ customerId })
    .returning()
    .onConflictDoUpdate({
      target: cart.customerId,
      set: { updatedAt: new Date() },
    });

  const [{ id }] = result;

  if (id) {
    await DB.insert(cartLineItem).values({
      cartId: id,
      productId,
      itemName,
      price,
      quantity,
      variant,
    });
  }

  return id;
};

const findCart = async (id: string): Promise<Cart> => {
  const cartData = await DB.query.cart.findFirst({
    where: (cart, { eq }) => eq(cart.customerId, id),
    with: {
      lineItems: true,
    },
  });

  if (!cartData) {
    throw new NotFoundError("cart not found");
  }

  return cartData;
};

const updateCart = async (
  id: string,
  quantity: number
): Promise<CartLineItem> => {
  const [newCartLineItem] = await DB.update(cartLineItem)
    .set({ quantity })
    .where(eq(cartLineItem.id, id))
    .returning();

  return newCartLineItem;
};

const deleteCart = async (id: string) => {
  await DB.delete(cartLineItem).where(eq(cartLineItem.id, id)).returning();
  return true;
};

const clearCartData = async (id: string): Promise<boolean> => {
  await DB.delete(cart).where(eq(cart.id, id)).returning();
  return true;
};

export const CartRepository: CartRepositoryType = {
  createCart,
  findCart,
  updateCart,
  deleteCart,
  clearCartData,
};
