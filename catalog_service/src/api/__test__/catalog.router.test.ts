import request from "supertest";
import express from "express";
import { faker } from "@faker-js/faker/.";
import catalogRouter, { catalogService } from "../catalog.router";
import { mockRequest, productFactory } from "../../utils/test.utils";

const app = express();
app.use(express.json());
app.use("/", catalogRouter);

describe("Catalog Router", () => {
  const req = request(app);

  describe("POST /product", () => {
    test("should create a product", async () => {
      const requestBody = mockRequest();
      const product = productFactory.build();

      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await req
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(product);
    });

    test("should resposnd with validation error 400", async () => {
      const requestBody = mockRequest();

      const response = await req
        .post("/product")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBe("name should not be empty");
    });

    test("should resposnd with an internal server error 500", async () => {
      const requestBody = mockRequest();

      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("error occured while creating product"))
        );

      const response = await req
        .post("/product")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe("error occured while creating product");
    });
  });

  describe("PATCH /product/:id", () => {
    test("should update a product", async () => {
      const product = productFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await req
        .patch(`/product/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(product);
    });

    test("should resposnd with validation error 400", async () => {
      const product = productFactory.build();
      const requestBody = {
        name: product.name,
        price: -1,
        stock: product.stock,
      };

      const response = await req
        .patch(`/product/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body).toBe("price must not be less than 1");
    });

    test("should resposnd with an internal server error 500", async () => {
      const product = productFactory.build();
      const requestBody = {
        name: product.name,
        price: product.price,
        stock: product.stock,
      };

      jest
        .spyOn(catalogService, "updateProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("error occured while updating product"))
        );

      const response = await req
        .patch(`/product/${product.id}`)
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe("error occured while updating product");
    });
  });

  describe("GET /products?limit=0&offset=0", () => {
    test("should return a range of products based on limit and offset", async () => {
      const randomLimit = faker.number.int({ min: 1, max: 50 });
      const products = productFactory.buildList(randomLimit);

      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.resolve(products));

      const response = await req
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(products);
    });

    test("should return error if unable to get products", async () => {
      const randomLimit = faker.number.int({ min: 1, max: 50 });

      jest
        .spyOn(catalogService, "getProducts")
        .mockImplementationOnce(() => Promise.reject(new Error("unable to get products!")));

      const response = await req
        .get(`/products?limit=${randomLimit}&offset=0`)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe("unable to get products!");
    });
  });

  describe("GET /product/:id", () => {
    test("should return a product based on id", async () => {
      const product = productFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.resolve(product));

      const response = await req
        .get(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(product);
    });

    test("should return error if unable to get product based on id", async () => {
      const product = productFactory.build();

      jest
        .spyOn(catalogService, "getProduct")
        .mockImplementationOnce(() => Promise.reject(new Error("unable to get product!")));

        const response = await req
        .get(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe("unable to get product!");
    });
  });

  describe("DELETE /product/:id", () => {
    test("should delete a product based on id", async () => {
      const product = productFactory.build();

      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.resolve(product.id!));

      const response = await req
        .delete(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(product.id!);
    });

    test("should return error if unable to delete product based on id", async () => {
      const product = productFactory.build();

      jest
        .spyOn(catalogService, "deleteProduct")
        .mockImplementationOnce(() => Promise.reject(new Error("unable to delete product!")));

        const response = await req
        .delete(`/product/${product.id}`)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toBe("unable to delete product!");
    });
  });
});
