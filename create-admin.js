import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import User from './src/app/models/user.js';
import './src/database/index.js';

async function createAdmin() {
    try {
        const existingAdmin = await User.findOne({ where: { email: 'admin@admin.com' } });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        const password_hash = await bcrypt.hash('admin123', 10);

        await User.create({
            id: v4(),
            name: 'Admin',
            email: 'admin@admin.com',
            password_hash,
            admin: true,
        });

        console.log('Admin user created: email: admin@admin.com, password: admin123');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        process.exit();
    }
}

createAdmin();