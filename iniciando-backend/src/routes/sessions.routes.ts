import { Router } from 'express';
import AuthenticateUserSession from '../services/AuthenticateUserSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserSession();
  const { user, token } = await authenticateUser.execute({ email, password });

  delete user.password;

  response.json({ user, token });
});

export default sessionsRouter;
