import myAxios from 'axios';
import { appRouters } from 'shared/urlResources';

export const LOGIN_API = `http://localhost/Kanban/server/controllers/user/login/auth.php`;
export const LOGOUT_API = `http://localhost/Kanban/server/controllers/user/logout/deleteToken.php`;

export { appRouters, myAxios };
