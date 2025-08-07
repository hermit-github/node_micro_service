import { DB } from "../db/db.connection";
import { cart } from "../db/schema";
import { CartRepositoryType } from "../types/repository.types";

const createCart = async (input: any): Promise<any> => {

  const result = await DB.insert(cart).values({
    customerId:"848bb365-aef8-4da0-b43d-9a841899843b"
  }).returning({cartId:cart.id})

  return result;
};

const findCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart,
};
