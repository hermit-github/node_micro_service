import { faker } from "@faker-js/faker/.";
import { ICatalogRepository } from "../interface/catalog_repository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  create(data: Product): Promise<Product> {
    const mockProduct = {
      id: faker.string.uuid(),
      ...data,
    } as Product;

    return new Promise((resolve) => {
      resolve(mockProduct);
    });
  }
  findAll(): Promise<Product[]> {
    return Promise.resolve([])
  }
  findById(id: string): Promise<Product> {
    return Promise.resolve({id} as unknown as Product)
  }
  delete(id: string) {
    return Promise.resolve({id} as unknown as Product)
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }
}
