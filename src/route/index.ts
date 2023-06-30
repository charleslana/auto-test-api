import itemRoute from './itemRoute';
import openaiRoute from './openaiRoute';
import shopRoute from './shopRoute';
import userHistoricRoute from './userHistoricRoute';
import userItemRoute from './userItemRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/openai', openaiRoute);
routes.use('/user/historic', userHistoricRoute);
routes.use('/item', itemRoute);
routes.use('/user/item', userItemRoute);
routes.use('/shop', shopRoute);

export default routes;
