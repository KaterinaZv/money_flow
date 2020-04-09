
class Transaction {

    constructor({id, source_agent_id, destination_agent_id, count, date, category_id, transaction_type}) {
        this._id = id;
        this._source_agent_id = source_agent_id;
        this.destination_agent_id = destination_agent_id;
        this._count = count;
        this._date = date;
        this.category_id = category_id;
        this.transaction_type = transaction_type;
    }

    get id() {
        return this._id;
    }
    
    set count(newValue) {
        this._count = newValue;
        this._source_agent_id = source_agent_id;
        this.destination_agent_id = destination_agent_id;
        this._date = date;
        this.category_id = category_id;
        this.transaction_type = transaction_type;
    }

    get count() {
        return this._count;
    }

    toJSON() {
        return {
            id: this.id,
            count: this.count,
            source_agent_id: this.source_agent_id,
            destination_agent_id: this.destination_agent_id,
            date: this.date,
            category_id: this.category_id,
            transaction_type: this.transaction_type
        }
    }
}

export default Transaction;
