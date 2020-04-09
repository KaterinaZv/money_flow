import Category from '../models/Category.js';
import { CategoryRepository } from '../repositories/CategoryRepository.js';

class CategoryController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.categoryRepository = new CategoryRepository(pool);
    }

    async get(request, response, next) {
        response.json(await this.categoryRepository.getAllCategories());
    }

    async create(request, response, next) {

        const name = request.body.name;

        const category = await this.categoryRepository.createCategory(name);
        this._categories.set(id, category);

        response.send(category);
    }

    async update(request, response, next) {

        const id = Number(request.param.id);
        const name = request.body.name;

        try {
            const category = await this.categoryRepository.updateCategory({
                id: id,
                name: name
            });
            response.json(category);
        } catch (e) {
            response.status(500).send(e.message);
        }
    }

    async delete(request, response, next) {
        const id = Number(request.params.id);

        try {
            await this.categoryRepository.deleteCategory(id);
            response.send('ok');
        } catch (e) {
            response.status(500).send(e.message);
        }
    }
}

export default CategoryController;
