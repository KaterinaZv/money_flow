import express            from 'express';
import request            from 'supertest';

import CategoryRepository from '../src/repositories/CategoryRepository.js';
import UserRepository     from '../src/repositories/UserRepository.js';
import CategoryRouter     from '../src/routers/CategoryRouter.js';
import User               from '../src/models/User';


const app = express();

const client = {
    query: jest.fn(),
    release: jest.fn()
};
const pool = {
    connect: jest.fn(() => client),
    query: jest.fn()
};

jest.mock('../src/repositories/UserRepository.js');
jest.mock('../src/repositories/CategoryRepository.js');

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

});
