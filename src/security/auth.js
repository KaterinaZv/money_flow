import jwt            from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository.js';
import pool           from '../database.js';

class Security {
    async checkUser(request, response, next) {
        const userRepository = new UserRepository(pool);
        try {
            if (request.headers.authorization !== undefined) {
                const token = request.headers.authorization.split(' ')[1];
                const decoded = await jwt.decode(token);
                const user = await userRepository.findByEmailAndId(decoded.id, decoded.email);
                if (user !== null) {
                    request.user = user;
                    next();
                } else {
                    response.status(500).send('Invalid auth data');
                }
            } else {
                response.status(500).send('Invalid auth data');
            }
        } catch (e) {
            console.log(e);
            response.status(500).send('Invalid auth data');
        }
    }
}

export default Security;
