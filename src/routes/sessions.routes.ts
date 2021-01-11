import { Router } from 'express';
import CreateAuthenticateService from '../services/CreateAuthenticateService';

// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta
const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUser = new CreateAuthenticateService();

  const { user, token } = await authenticateUser.execute({ email, password });
  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoutes;
