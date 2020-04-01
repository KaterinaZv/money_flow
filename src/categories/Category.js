class Category {

    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get (request, response ,next) {
        response.send('Get category')
    }

    create (request, response ,next) {
        response.send('Creat category')
    }

    update (request, response ,next) {
        response.send('Update category')
    }

    delete (request, response ,next) {
        response.send('Delete category')
    }
}

export default Category;