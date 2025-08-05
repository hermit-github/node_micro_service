import { PrismaClient } from "../generated/prisma";
import { ICatalogRepository } from "../interface/catalog_repository.interface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data,
    });
  }

  async findAll(limit: number, offset: number): Promise<Product[]> {
    return this._prisma.product.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findById(id: string): Promise<Product> {
    const product = await this._prisma.product.findUnique({ where: { id } });

    if (product) {
      return Promise.resolve(product);
    }

    throw new Error("product not found");
  }

  async delete(id: string): Promise<Product> {
    return this._prisma.product.delete({ where: { id } });
  }

  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: { id: data.id },
      data,
    });
  }
}
