import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

const router = express.Router();
const transaction = new TransactionController();

router.route('/').get(transaction.get);
router.route('/').post(transaction.create);
router.route('/:id').put(transaction.update);
router.route('/:id').delete(transaction.delete);

export default router;