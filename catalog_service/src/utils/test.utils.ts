import { faker } from "@faker-js/faker";
import {Factory} from "rosie";
import { Product } from "../models/product.model";

export const productFactory = new Factory<Product>()
  .attr("id", faker.string.uuid())
  .attr("name", faker.commerce.productName())
  .attr("description", faker.commerce.productDescription())
  .attr("stock", faker.number.int({ min: 10, max: 100 }))
  .attr("price", +faker.commerce.price());

export const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    ...rest,
  };
};

export const mockRequest = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    price: parseFloat(faker.commerce.price()),
  };
};