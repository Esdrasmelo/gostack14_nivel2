import { Router } from 'express';
import AuthenticateUserSession from '../services/AuthenticateUserSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserSession();
  const { user: { id, name, created_at, updated_at, avatar }, token } = await authenticateUser.execute({ email, password });

  response.json({ id, name, created_at, updated_at, avatar, token });
});

export default sessionsRouter;
