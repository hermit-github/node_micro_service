import { CartLineItem, NewCartLineItem } from "../db/schema";
import { CartEditRequestInput, CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repository";
import { logger, NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (
  input: CartRequestInput,
  repo: CartRepositoryType
) => {
  // make a sync call to catalog microservice
  const product = await GetProductDetails(input.productId);

  if (product.stock < input.quantity) {
    throw new NotFoundError("product is out of stock");
  }

  const lineItemData = {
    productId: product.id,
    price: product.price.toString(),
    quantity: input.quantity,
    itemName: product.name,
    variant: product.variant,
  } as NewCartLineItem;

  return await repo.createCart(input.customerId, lineItemData);
};

export const GetCart = async (id: string, repo: CartRepositoryType) => {
  const data = await repo.findCart(id);

  if (!data) {
    throw new NotFoundError("cart not found");
  }

  return data;
};

export const EditCart = async (
  input: CartEditRequestInput,
  repo: CartRepositoryType
) => {
  const data = await repo.updateCart(input.id, input.quantity);
  return data;
};

export const DeleteCart = async (id: string, repo: CartRepositoryType) => {
  const data = await repo.deleteCart(id);
  return data;
};
