import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

import AppError from '../errors/AppErrors';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserSession {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    const { secret, expiresIn } = authConfig.jwt;

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserSession;
