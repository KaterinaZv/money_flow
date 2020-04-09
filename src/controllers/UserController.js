
import { UserRepository } from '../repositories/UserRepository.js';
class UserController {

  constructor(pool) {
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this.userRepository = new UserRepository(pool);
  }

  async get(request, response, next) {
    response.json(await this.userRepository.getAllUsers());
  }

  async create(request, response, next) {

    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    const user = await this.userRepository.createUser(name, email, password);

    response.send(user);
  }

  async update(request, response, next) {
    const id = Number(request.params.id);
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;

    try {
      const user = await this.userRepository.updateUser({
        id: id,
        name: name,
        email: email,
        password: password
      });
      response.json(user);
    } catch (e) {
      response.status(500).send(e.message);
    }
  }

  async delete(request, response, next) {
    const id = Number(request.params.id);

    try {
      await this.userRepository.deleteUser(id);
      response.send('ok');
    } catch (e) {
      response.status(500).send(e.message);
    }
  }
}

export default UserController;