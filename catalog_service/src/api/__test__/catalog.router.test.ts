import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker/.';
import catalogRouter, { catalogService } from '../catalog.router';
import { mockRequest, productFactory } from '../../utils/test.utils';

const app = express();
app.use(express.json());
app.use('/', catalogRouter);

describe('Catalog Router', () => {
    const req = request(app);

    describe('POST /product', () => {
        test("should create a product", async () => {
            const requestBody = mockRequest();
            const product = productFactory.build();

            jest
                .spyOn(catalogService,'createProduct')
                .mockImplementationOnce(() => Promise.resolve(product) )

            const response = await req
                .post('/product')
                .send(requestBody)
                .set('Accept', 'application/json')
            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(product)
        })
    })
})