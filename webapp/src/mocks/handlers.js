import AUTH from './auth';
import TEAM from './team';
import USER from './user';

const handlers = [...AUTH, ...USER, ...TEAM];

export default handlers;
