import { faker } from "@faker-js/faker/.";
import { ICatalogRepository } from "../interface/catalog_repository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: faker.string.uuid(),
            ...data
        } as Product;

        return new Promise((resolve) => {
            resolve(mockProduct);
        });
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}