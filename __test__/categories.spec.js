
import express from 'express';
import request from 'supertest';
import CategoryRouter from '../src/routers/CategoryRouter.js';
import Category from '../src/models/Category.js';
import CategoryRepository from '../src/repositories/CategoryRepository.js';
import Security from '../src/security/auth.js';
import User from '../src/models/User.js';
import UserRepository from '../src/repositories/UserRepository.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };


jest.mock('../src/security/auth.js');
jest.mock('../src/repositories/UserRepository.js');
jest.mock('../src/repositories/CategoryRepository.js');

    const formData = new Category({
        "id": "8",
        "name": "Coffee"
    });



describe('test categories route', () => {

    test('test categories GET method success answer', async () => {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbHNvbkBmdXIuY29tIiwibmFtZSI6IldpbHNvbiIsImlkIjoiNyIsImlhdCI6MTU4NzcxNzM4MywiZXhwIjoxNTg3ODAzNzgzfQ.wAOCoPoYCnhBGygh8yyJp0jROsnOnK6huD6it9RNvEs';

        CategoryRepository.mockImplementation(() => ({
            getAllCategories: () => [1],
        }));

        const user = new User({
            id: 7,
            name: 'Wilson',
            email: 'wilson@fur.com'
        });
        user._password = '$2a$10$Ou3rcS76Iv32lbxnQ61nu.7IM4Jx6liagoTP6mLle8upfb60wU6j6';

        CategoryRepository.mockImplementation(() => ({
            getAllCategories: () => [1],
        }));

        UserRepository.mockImplementation(() => ({
            findByEmailAndId: () => user,
        }));

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router)).get('/api/categories').set('Authorization', token);

        const response = res.body;

        expect(JSON.stringify(response))
            .toBe(JSON.stringify([1]));
    });
/*
    test('test categories POST method success answer', async () => {


        CategoryRepository.mockImplementation(() => {
            return {
                createCategory: () => {
                    return formData;
                },
            };

        user._password = '$2a$10$wOim5rfkQD2g.s3vq9JJEet6vTSbkq0X7c1FzFDMEipJShLXip2rG';

        UserRepository.mockImplementation(() => ({
            findByEmailAndId: () => user,
        }));

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
            .post('/api/categories')
            .send({ "name": "bar" })
            .set('Authorization', token);

        const response = res.body;
        expect(response).toEqual(formData);
    });
    /*
       test('test categories PUT method success answer', async () => {
           CategoryRepository.mockImplementation(() => {
               return {
                   updateCategory: () => {
                       return formData;
                   },
               };
           });
           const categoryRouter = new CategoryRouter(pool);
   
           const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
               .put('/api/categories/3')
               .send({ "name": "any" })
               .set('Authorization', token)));
   
           const response = res.body;
   
           expect(JSON.stringify(response)).toBe(JSON.stringify(formData));
       });
   
       test('test categories DELETE method success answer', async () => {
           CategoryRepository.mockImplementation(() => {
               return {
                   deleteCategory: () => {
                       return 'ok';
                   },
               };
           });
           const categoryRouter = new CategoryRouter(pool);
   
           const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
               .delete('/api/categories/7')
               .set('Authorization', token)));
   
           const response = res.text;
   
           expect(response).toBe('ok');
       });
      */

    });