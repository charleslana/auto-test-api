import openaiRoute from './openaiRoute';
import userHistoricRoute from './userHistoricRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/openai', openaiRoute);
routes.use('/historic', userHistoricRoute);

export default routes;
