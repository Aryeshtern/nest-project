import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'user'},
    ];

    public getAllUsers(role?: 'admin' | 'user'): any[] {
        if (role) {
            return this.users.filter(user => user.role === role);
        }
        return this.users;
    }

    getUserById(id: string): any {
        return this.users.find(user => user.id.toString() == id);
    }

    deleteUser(id: string): any {
        this.users = this.users.filter(user => user.id.toString() !== id);
        return this.users;
    }

    updateUser(id: string, updatedUser: any): any {
        const index = this.users.findIndex(user => user.id.toString() == id);
        if (index!== -1) {
            this.users[index] = {...this.users[index],...updatedUser };
            return this.users;
        }
        return null;
    }

    createUser(newUser: any): any {
        newUser.id = Math.max(...this.users.map(user => user.id)) + 1; 
        this.users.push(newUser);
        return this.users;
    }
}


