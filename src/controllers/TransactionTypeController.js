class TransactionTypeController {

    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get (request, response ,next) {
        response.send('Get transaction type')
    }

    create (request, response ,next) {
        response.send('Creat transaction type')
    }

    update (request, response ,next) {
        response.send('Update transaction type')
    }

    delete (request, response ,next) {
        response.send('Delete transaction type')
    }
}

export default TransactionTypeController;