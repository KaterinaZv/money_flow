import express from 'express';
import TransactionTypeControllers from '../controllers/TransactionTypeController.js';

const router = express.Router();
const transactionType = new TransactionTypeControllers();

router.route('/').get(transactionType.get);
router.route('/').post(transactionType.create);
router.route('/:id').put(transactionType.update);
router.route('/:id').delete(transactionType.delete);

export default router;