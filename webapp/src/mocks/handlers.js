import AUTH from './auth';
import COMMENT from './comment';
import TEAM from './team';
import USER from './user';

const handlers = [...AUTH, ...USER, ...TEAM, ...COMMENT];

export default handlers;
