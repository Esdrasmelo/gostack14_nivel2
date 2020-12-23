import { Router } from 'express';
import AuthenticateUserSession from '../services/AuthenticateUserSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserSession();
    const { user, token } = await authenticateUser.execute({ email, password });

    response.json({ user, token });
  } catch (error) {
    return response.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionsRouter;
