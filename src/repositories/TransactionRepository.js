import Transaction from '../models/Transaction.js';

export class TransactionRepository {

    constructor(pool) {
        this._pool = pool;
    }

    async getAllTransactions() {
        let transactions = [];

        const rawTransactions = await this._pool.query('SELECT * FROM public."transaction";');

        for (let rawTransaction of rawTransactions.rows) {
            let transaction = new Transaction({
                id  : rawTransaction.id,
                count: rawTransaction.count,
                source_agent_id: rawTransaction.source_agent_id,
                destination_agent_id: rawTransaction.destination_agent_id,
                date: rawTransaction.date,
                category_id: rawTransaction.category_id,
                transaction_type: rawTransaction.transaction_type
            });
            transactions.push(transaction);
        }

        return transactions;
    }

    async createTransaction(count, source_agent_id, destination_agent_id, date, category_id, transaction_type) {
        const rawTransaction = await this._pool.query(
            'INSERT INTO public."transaction" (count, source_agent_id, destination_agent_id, date, category_id, transaction_type ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
        , [count, source_agent_id, destination_agent_id, date, category_id, transaction_type]);

        let transaction = new Transaction({
            id  : rawTransaction.rows[0].id,
            count: rawTransaction.rows[0].count,
            source_agent_id: rawTransaction.rows[0].source_agent_id,
            destination_agent_id: rawTransaction.rows[0].destination_agent_id,
            date: rawTransaction.rows[0].date,
            category_id: rawTransaction.rows[0].category_id,
            transaction_type: rawTransaction.rows[0].transaction_type

        });

        return transaction;
    }

    async updateTransaction({id, count}) {
        const rawTransaction = await this._pool.query('UPDATE public."transaction" SET count=$2 WHERE id=$1 RETURNING *;', [id, count]);

        if (rawTransaction.rows.length === 0) {
            throw Error('Error on update transaction');
        }

        let transaction = new Transaction({
            id  : rawTransaction.rows[0].id,
            count: rawTransaction.rows[0].count
        });

        return transaction;
    }

    async deleteTransaction(id) {
        const result = await this._pool.query('DELETE FROM public."transaction" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.length === 0) {
            throw Error('Error on delete transaction');
        }

        console.log(result);
    }
}