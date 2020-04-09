import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

class TransactionRouter {

    _router = express.Router();

    constructor(pool) {
        this._transactionRouter = new TransactionController(pool);

        this._router.route('/').get(this._transactionRouter.get);
        this._router.route('/').post(this._transactionRouter.create);
        this._router.route('/:id').put(this._transactionRouter.update);
        this._router.route('/:id').delete(this._transactionRouter.delete);
    }

    get router() {
        return this._router;
    }
}

export default TransactionRouter;