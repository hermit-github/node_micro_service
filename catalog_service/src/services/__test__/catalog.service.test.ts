import { ICatalogRepository } from "../../interface/catalog_repository.interface";
import { Product } from "../../models/product.model";
import { MockCatalogRepository } from "../../repositories/mock.catalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
import { mockProduct, productFactory } from "../../utils/test.utils";

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
        .mockImplementationOnce(() => Promise.resolve({} as Product));

      await expect(service.createProduct(product)).rejects.toThrow(
        "Unable to create product!"
      );
    });

    test("should throw error if product already exists", async () => {
      const service = new CatalogService(repository);
      const product = mockProduct({
        price: parseFloat(faker.commerce.price()),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("product already exists!"))
        );

      await expect(service.createProduct(product)).rejects.toThrow(
        "product already exists!"
      );
    });
  });

  describe("update product", () => {
    test("should update a product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: parseFloat(faker.commerce.price()),
        id: faker.string.uuid(),
      });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    });

    test("should update a product", async () => {
      const service = new CatalogService(repository);
      const reqBody = mockProduct({
        price: parseFloat(faker.commerce.price()),
        id: faker.string.uuid(),
      });
      const result = await service.updateProduct(reqBody);
      expect(result).toMatchObject(reqBody);
    });

    test("should throw error if product doesn't exists", async () => {
      const service = new CatalogService(repository);
      const product = mockProduct({
        price: parseFloat(faker.commerce.price()),
      });

      jest
        .spyOn(repository, "create")
        .mockImplementation(() =>
          Promise.reject(new Error("product doesn't exist!"))
        );

      await expect(service.createProduct(product)).rejects.toThrow(
        "product doesn't exist!"
      );
    });
  });

  describe("get products", () => {
    test("should return a list of products", async () => {
      const service = new CatalogService(repository);
      const randomLimit = faker.number.int({ min: 1, max: 50 });
      const products = productFactory.buildList(randomLimit);
      
      jest
        .spyOn(repository,"findAll")
        .mockImplementationOnce(() => Promise.resolve(products));
      
      const result = await service.getProducts(randomLimit, 0);
      expect(result.length).toEqual(randomLimit);
      expect(result).toMatchObject(products);
    });

    test("should throw error if products do not exits", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository,"findAll")
        .mockImplementationOnce(() => Promise.reject(new Error("products do not exist!")));
      
      await expect(service.getProducts(1,5)).rejects.toThrow(
        "products do not exist!"
      )

    })
  });

  describe("get product", () => {
    test("should return a product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();
      
      jest
        .spyOn(repository,"findById")
        .mockImplementationOnce(() => Promise.resolve(product));
      
      const result = await service.getProduct(product.id!);
      expect(result).toMatchObject(product);
    });

    test("should throw error if product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository,"findById")
        .mockImplementationOnce(() => Promise.reject(new Error("product doesn't exist!")));

      
      await expect(service.getProduct(faker.string.uuid())).rejects.toThrow(
        "product doesn't exist!"
      )

    })
  });

  describe("delete product", () => {
    test("should return a product by id", async () => {
      const service = new CatalogService(repository);
      const product = productFactory.build();
      
      jest
        .spyOn(repository,"delete")
        .mockImplementationOnce(() => Promise.resolve(product.id!));
      
      const result = await service.deleteProduct(product.id!);
      expect(result).toBe(product.id!);
    });

    test("should throw error if product doesn't exist", async () => {
      const service = new CatalogService(repository);

      jest
        .spyOn(repository,"delete")
        .mockImplementationOnce(() => Promise.reject(new Error("product doesn't exist!")));

      
      await expect(service.deleteProduct(faker.string.uuid())).rejects.toThrow(
        "product doesn't exist!"
      )

    })
  });
});
