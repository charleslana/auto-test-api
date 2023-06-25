import openaiRoute from './openaiRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/openai', openaiRoute);

export default routes;
