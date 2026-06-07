import { User } from "../user.model";

export class UserRepository {
    async findByEmail(email: string) {
        return User.findOne({
            email: email.toLowerCase(),
            deletedAt: null,
        });
    }

    async create(data: {
        name: string;
        email: string;
        passwordHash: string;
    }) {
        return User.create(data);
    }

    async findActiveById(id: string) {
        return User.findOne({
            _id: id,
            deletedAt: null,
            isActive: true,
        });
    }
}