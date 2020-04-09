import process from 'process';
import express from 'express';
import UserRouter from './routers/UserRouter.js';
import TransactionRouter from './routers/TransactionRouter.js';
import CategoryRouter from './routers/CategoryRouter.js';
import transactionType from './routers/TransactionTypeRouter.js';
import AgentRouter from './routers/AgentRouter.js';
import BalanceRouter from './routers/BalanceRouter.js';
import path from 'path';
import pool from './database.js';

const app = express();

const PORT = process.env.PORT ||
    3000;

const server = app.listen(PORT, async () => {
    console.log(`Server started on port ${server.address().port}`);

    await pool.connect();

    app.use(express.json());

    const userRouter = new UserRouter(pool);
    app.use('/api/users', userRouter.router);

    const agentRouter = new AgentRouter(pool);
    app.use('/api/agents', agentRouter.router);

    const transactionRouter = new TransactionRouter(pool);
    app.use('/api/transactions', transactionRouter.router);

    const categoryRouter = new CategoryRouter(pool);
    app.use('/api/categories', categoryRouter.router);

    const balanceRouter = new BalanceRouter(pool);
    app.use('/api/balances', balanceRouter.router);

    app.use('/api/transactiontypes', transactionType);

});

const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
sigs.forEach(sig => {
    process.on(sig, function () {
        console.log('Server shutdown');
        server.close(() => {
            pool.end();
            process.exit(0)
        });
    });
});