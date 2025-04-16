import { ICatalogRepository } from "../interface/catalog_repository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(
        private catalogRepository: ICatalogRepository
    ) {
        this._repository = catalogRepository;
    }

    async createProduct(input: any){
        const data = await this._repository.create(input);

        if (!data.id) {
            throw new Error("Unable to create product!");
        }

        return data;
    }

    async updateProduct(input:any){
        const data = await this._repository.update(input);

        // emit event to update record in elastic search

        if (!data) {
            throw new Error("Unable to update product!");
        }

        return data;
    }

    async getProducts(limit:number,offset:number){
        const products = await this._repository.findAll(limit,offset)
        return products;
    }

    async getProduct(id:string){
        const product = await this._repository.findById(id)
        return product;
    }

    async deleteProduct(id:string){
        const _id = await this._repository.delete(id);

        return _id;
    }
}