import conquestRoute from './conquestRoute';
import itemRoute from './itemRoute';
import openaiRoute from './openaiRoute';
import shopRoute from './shopRoute';
import userConquestRoute from './userConquestRoute';
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
routes.use('/conquest', conquestRoute);
routes.use('/user/conquest', userConquestRoute);

export default routes;
