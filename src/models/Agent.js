class Agent {

    constructor({ id, name, user_id }) {
        this._id = id;
        this._name = name;
        this.user_id = user_id;
    }

    get id() {
        return this._id;
    }

    set name(newValue) {
        this._name = newValue;
        this._user_id = user_id;
    }

    get name() {
        return this._name;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            user_id: this.user_id
        }
    }
}

export default Agent;