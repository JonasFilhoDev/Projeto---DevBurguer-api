import bcrypt from 'bcrypt';
import * as Yup from 'yup';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import authConfig from './../../config/auth.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailOrPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Email or Password incorrect!' });
    };

    if (!isValid) {
      emailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    try {
      const existingUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!existingUser) {
        emailOrPasswordIncorrect();
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password_hash,
      );

      if (!isPasswordCorrect) {
        emailOrPasswordIncorrect();
      }

      const token = jwt.sign(
        { id: existingUser.id, admin: existingUser.admin, name: existingUser.name, },
        authConfig.secret,
        {
          expiresIn: authConfig.expiresIn,
        });

      return response.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
      });
    } catch (err) {
      console.error('Error during login:', err);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new SessionController();
