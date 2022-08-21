import authHandler from './authHandler.mock';
import commentHandler from './commentHandler.mock';
import teamHandler from './teamHandler.mock';
import userHandler from './userHandler.mock';
import etcHandler from './etcHandler.mock';

const handlers = [...authHandler, ...userHandler, ...teamHandler, ...commentHandler, ...etcHandler];

export default handlers;
