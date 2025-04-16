import { Product } from "../models/product.model";

export interface ICatalogRepository {
    create(data:Product):Promise<Product>;
    findAll(limit:number,offset:number):Promise<Product[]>;
    findById(id:string):Promise<Product>;
    delete(id:string):Promise<string>;
    update(data:Product):Promise<Product>;
}