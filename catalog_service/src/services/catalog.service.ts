import { ICatalogRepository } from "../interface/catalog_repository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(
        private catalogRepository: ICatalogRepository
    ) {
        this._repository = catalogRepository;
    }

    createProduct(data: any){

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