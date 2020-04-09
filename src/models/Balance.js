class Balance {

    constructor({id, balance, agent_id}) {
        this._id = id;
        this._balance = balance;
        this.agent_id = agent_id;
    }

    get id() {
        return this._id;
    }

    set balance(newValue) {
        this._balance = newValue;
        this._agent_id = agent_id;
    }

    get balance() {
        return this._balance;
    }

    toJSON() {
        return {
            id: this.id,
            balance: this.balance,
            agent_id: this.agent_id
        }
    }
}

export default Balance;