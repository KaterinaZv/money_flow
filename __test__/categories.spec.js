import express from 'express';
import request from 'supertest';
import CategoryRouter from '../src/routers/CategoryRouter.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

import CategoryRepository from '../src/repositories/CategoryRepository.js';

jest.mock('../src/repositories/CategoryRepository.js');

describe('test categories route', () => {

    const allCategories = {"id": "Category"};

    test('test categories GET method success answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                getAllCategories: () => {
                    return allCategories;
                },
            };
        });


        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router)).get('/api/categories');

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify({"id": "Category"}));
    });

    const formData = {
        "id": "1",
        "name": "Book"
    };

    test('test categories POST method success answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                createCategory: () => {
                    return formData;
                },
            };
        });


        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router)).post('/api/categories').send({"name": "foo"});



        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(formData));
    });
});