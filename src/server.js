import process from 'process';
import express from 'express';
import user from './routers/UserRouter.js';
import transaction from './routers/TransactionRouter.js';
import category from './routers/CategoryRouter.js';
import transactionType from './routers/TransactionTypeRouter.js';
import categoryPages from './routers/CategoryPages.js';
import path from 'path';

const __dirname = path.resolve();

import mustacheExpress from 'mustache-express';


const app = express();

const PORT = process.env.PORT || 
3000;

app.use(express.json());

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/api/users', user);
app.use('/api/transactions', transaction);
app.use('/api/categories', category);
app.use('/api/transaction/types', transactionType);

app.use('/categories', categoryPages);


app.use((error, request, response, next) => {
    console.log(error.stack);
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});