import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateAuthenticateService {
  public async execute({ email, password }: Request): Promise<Response> {
    const users = getRepository(User);
    const user = await users.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }
    const token = sign({}, 'b042a456f7871251e75192fbc132c797', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}

export default CreateAuthenticateService;
