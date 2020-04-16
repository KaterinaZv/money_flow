import Balance from '../models/Balance.js';

export class BalanceRepository {

    constructor(pool) {
        this._pool = pool;
    }

    async getAllBalances() {
        let balances = [];

        const rawBalances = await this._pool.query('SELECT * FROM public."balance";');

        for (let rawBalance of rawBalances.rows) {
            let money_status = new Balance({
                id: rawBalance.id,
                balance: rawBalance.balance,
                agent_id: rawBalance.agent_id
            });
            balances.push(money_status);
        }

        return balances;
    }

    async findBalanceByIdUser({id}) {
        let balances = [];
        const rawBalances = await this._pool.query(
            'SELECT * FROM  public."balance" WHERE agent_id = (SELECT id FROM public."agent" WHERE user_id = $1);'
            , [id]);

            for (let rawBalance of rawBalances.rows) {
                let money_status = new Balance({
                    id: rawBalance.id,
                    balance: rawBalance.balance,
                    agent_id: rawBalance.agent_id
                });
                balances.push(money_status);
            }

        return balances;
    }

    async createBalance(balance, agent_id) {
        const rawBalance = await this._pool.query(
            'INSERT INTO public."balance" (balance, agent_id) VALUES ($1, $2) RETURNING *;'
            , [balance, agent_id]);

        let money_status = new Balance({
            id: rawBalance.rows[0].id,
            balance: rawBalance.rows[0].balance,
            agent_id: rawBalance.rows[0].agent_id
        });

        return money_status;
    }

    async updateBalance({ id, balance }) {
        const rawBalance = await this._pool.query('UPDATE public."balance" SET balance=$2 WHERE id=$1 RETURNING *;', [id, balance]);

        if (rawBalance.rows.length === 0) {
            throw Error('Error on update balance');
        }

        let money_status = new Balance({
            id: rawBalance.rows[0].id,
            balance: rawBalance.rows[0].balance,
            agent_id: rawBalance.rows[0].agent_id
        });

        return money_status;
    }

    async deleteBalance(id) {
        const result = await this._pool.query('DELETE FROM public."balance" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.length === 0) {
            throw Error('Error on delete balance');
        }
        console.log(result);
    }
}