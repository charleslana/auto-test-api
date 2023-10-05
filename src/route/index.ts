import commentRoute from './commentRoute';
import conquestRoute from './conquestRoute';
import itemRoute from './itemRoute';
import openAIRoute from './openAIRoute';
import postRoute from './postRoute';
import shopRoute from './shopRoute';
import userConquestRoute from './userConquestRoute';
import userHistoricRoute from './userHistoricRoute';
import userItemRoute from './userItemRoute';
import userRoute from './userRoute';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/openai', openAIRoute);
routes.use('/user/historic', userHistoricRoute);
routes.use('/item', itemRoute);
routes.use('/user/item', userItemRoute);
routes.use('/shop', shopRoute);
routes.use('/conquest', conquestRoute);
routes.use('/user/conquest', userConquestRoute);
routes.use('/post', postRoute);
routes.use('/comment', commentRoute);

export default routes;
