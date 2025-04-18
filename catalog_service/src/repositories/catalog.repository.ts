import { ICatalogRepository } from "../interface/catalog_repository.interface";
import { Product } from "../models/product.model";
import { productFactory } from "../utils/test.utils";

export class CatalogRepository implements ICatalogRepository {
    create(data: Product): Promise<Product> {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
    findAll(limit:number,offset:number): Promise<Product[]> {
        const products = productFactory.buildList(limit);
        return Promise.resolve(products);
    }
    findById(id: string): Promise<Product> {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
    delete(id: string): Promise<string> {
        const product = productFactory.build();
        return Promise.resolve(product.id!);
    }
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}