import { Product } from "../models/product.model";

export interface ICatalogRepository {
    create(data:Product):Promise<Product>;
    findAll():Promise<Product[]>;
    findById(id:string):Promise<Product>;
    delete(id:string):Promise<Product>;
    update(data:Product):Promise<Product>;
}