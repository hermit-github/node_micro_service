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

    updateProduct(data:any){

    }

    getProducts(limit:number,offset:number){

    }

    getProduct(id:string){

    }

    deleteProduct(id:string){

    }
}