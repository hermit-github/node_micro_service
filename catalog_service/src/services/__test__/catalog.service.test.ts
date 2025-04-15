import { ICatalogRepository } from "../../interface/catalog_repository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repositories/mock.catalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";

const mockProduct = (rest: any) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    ...rest,
  };
};

describe("Catalog Service", () => {
  let repository: ICatalogRepository;

  beforeEach(() => {
    repository = new MockCatalogRepository();
  });

  afterEach(() => {
    repository = {} as MockCatalogRepository;
  });

  describe("create product", () => {
    test("should create a product", async () => {
      const service = new CatalogService(repository);
      const product = mockProduct({
        price: parseFloat(faker.commerce.price()),
      });
      const result = await service.createProduct(product);
      expect(result).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        stock: expect.any(Number),
      });
    });

    test("should return error if unable to create product", async () => {
      const service = new CatalogService(repository);
      const product = mockProduct({
        price: parseFloat(faker.commerce.price()),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementation(() => Promise.resolve({} as Product));

      await expect(service.createProduct(product)).rejects.toThrow(
        "Unable to create product!"
      );
    });
  });
});
